import { chat, convertMessagesToModelMessages, maxIterations, toolDefinition } from "@tanstack/ai"
import type { ToolResultStore } from "./buildWorkerTools.js"
import { buildWorkerTools } from "./buildWorkerTools.js"
import { getAdapter } from "./provider.js"
import { getSubagentRole, subagentRoleNames } from "./subagentRoles.js"
import { toolCategories } from "./toolCategories.js"
import { executeWorkerRoute } from "./tools/routeExecutor.js"

const MAX_SUBAGENT_DEPTH = 2

export interface SubagentContext {
    db: any
    redis: any
    streamKey: string
    idOrganization: string
    idYear: string | null
    currentDepth: number
    parentToolResultStore: ToolResultStore
}

export interface SubagentTokenUsage {
    promptTokens: number
    completionTokens: number
    totalTokens: number
}

export function buildSubagentTool(context: SubagentContext) {
    const def = toolDefinition({
        name: "delegate_to_subagent",
        description: `Déléguer une tâche à un sous-agent spécialisé. Utilise cet outil quand la tâche nécessite une expertise spécifique.

Rôles disponibles :
- data_analyst : Analyse de données financières, requêtes, agrégations, tendances.
- entry_creator : Création d'écritures comptables, catégorisation, ventilation.
- document_processor : Extraction OCR, analyse de documents, classement de fichiers.
- auditor : Audit comptable, détection d'anomalies, vérification d'équilibres.

Le sous-agent a accès uniquement aux outils pertinents pour son rôle. Il exécute la tâche et retourne le résultat.`,
        inputSchema: {
            type: "object" as const,
            properties: {
                role: {
                    type: "string" as const,
                    enum: [...subagentRoleNames],
                    description: "Le rôle du sous-agent spécialisé.",
                },
                task: {
                    type: "string" as const,
                    description: "Description précise de la tâche à déléguer au sous-agent.",
                },
                context: {
                    type: "string" as const,
                    description: "Contexte additionnel utile pour le sous-agent (données, résultats précédents, etc.).",
                },
            },
            required: ["role", "task"] as const,
        },
    })

    return {
        tool: def.server(async (args) => {
            const {
                role: roleName,
                task,
                context: taskContext,
            } = args as {
                role: string
                task: string
                context?: string
            }
            return runSubagent({ ...context, roleName, task, taskContext })
        }),
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 } as SubagentTokenUsage,
    }
}

async function runSubagent(
    params: SubagentContext & { roleName: string; task: string; taskContext?: string },
): Promise<unknown> {
    const { db, redis, streamKey, idOrganization, idYear, currentDepth, roleName, task, taskContext } = params

    if (currentDepth >= MAX_SUBAGENT_DEPTH) {
        return {
            error: `Profondeur maximale de délégation atteinte (${MAX_SUBAGENT_DEPTH}). Impossible de déléguer davantage.`,
        }
    }

    const role = getSubagentRole(roleName)
    if (!role) {
        return {
            error: `Rôle de sous-agent inconnu : "${roleName}". Rôles disponibles : ${subagentRoleNames.join(", ")}`,
        }
    }

    const subagentDepth = currentDepth + 1

    // Publish subagent start event
    await redis.publish(
        streamKey,
        JSON.stringify({
            type: "SUBAGENT_RUN_START",
            role: roleName,
            depth: subagentDepth,
            task,
            timestamp: Date.now(),
        }),
    )

    try {
        // Filter tool categories for this role
        const filteredCategories = toolCategories.filter((c) => role.allowedToolCategories.includes(c.name))
        const toolResultStore: ToolResultStore = new Map()

        const tools = buildWorkerTools({
            categories: filteredCategories,
            db,
            idOrganization,
            executeRoute: async (pathSuffix, body) => executeWorkerRoute(db, idOrganization, pathSuffix, body),
            toolResultStore,
        })

        // If depth allows, add recursive subagent tool
        if (subagentDepth < MAX_SUBAGENT_DEPTH) {
            const nestedSubagent = buildSubagentTool({
                db,
                redis,
                streamKey,
                idOrganization,
                idYear,
                currentDepth: subagentDepth,
                parentToolResultStore: toolResultStore,
            })
            tools.push(nestedSubagent.tool)
        }

        // Build subagent system prompt
        let systemPrompt = role.systemPrompt
        if (taskContext) {
            systemPrompt += `\n\n## Contexte fourni par l'agent parent\n\n${taskContext}`
        }
        if (idYear) {
            systemPrompt += `\n\nL'exercice fiscal courant a l'identifiant : ${idYear}`
        }

        // Build messages — subagent starts fresh with just the delegated task
        const uiMessages = [
            {
                id: `subagent-${Date.now()}`,
                role: "user" as const,
                parts: [{ type: "text", content: task }],
            },
        ]

        const adapter = getAdapter()
        const modelMessages = convertMessagesToModelMessages(uiMessages as any)

        const stream = chat({
            adapter,
            messages: modelMessages as any,
            tools,
            systemPrompts: [systemPrompt],
            agentLoopStrategy: maxIterations(role.maxIterations),
        })

        let accumulatedContent = ""
        let promptTokens = 0
        let completionTokens = 0
        let totalTokens = 0

        for await (const chunk of stream) {
            // Forward chunks to Redis with subagent metadata
            const enrichedChunk = {
                ...(chunk as any),
                subagentRole: roleName,
                subagentDepth,
            }
            await redis.publish(streamKey, JSON.stringify(enrichedChunk))

            if (chunk.type === "TEXT_MESSAGE_CONTENT" && "delta" in chunk && typeof (chunk as any).delta === "string") {
                accumulatedContent += (chunk as any).delta
            }

            if (chunk.type === "RUN_FINISHED" && "usage" in chunk) {
                const usage = (chunk as any).usage
                if (usage) {
                    promptTokens += Number(usage.promptTokens ?? 0)
                    completionTokens += Number(usage.completionTokens ?? 0)
                    totalTokens += Number(usage.totalTokens ?? 0)
                }
            }

            if (chunk.type === "RUN_ERROR") {
                const errorMsg = (chunk as any).message ?? (chunk as any).error ?? "Unknown error"
                accumulatedContent += `\n\n[Erreur du sous-agent: ${typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)}]`
            }
        }

        // Publish subagent end event
        await redis.publish(
            streamKey,
            JSON.stringify({
                type: "SUBAGENT_RUN_END",
                role: roleName,
                depth: subagentDepth,
                timestamp: Date.now(),
                promptTokens,
                completionTokens,
                totalTokens,
            }),
        )

        return {
            role: roleName,
            result: accumulatedContent || "(Aucun résultat)",
            tokenUsage: { promptTokens, completionTokens, totalTokens },
        }
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)

        await redis.publish(
            streamKey,
            JSON.stringify({
                type: "SUBAGENT_RUN_END",
                role: roleName,
                depth: subagentDepth,
                timestamp: Date.now(),
                error: errorMsg,
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0,
            }),
        )

        return { error: `Erreur du sous-agent ${roleName} : ${errorMsg}` }
    }
}
