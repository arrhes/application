import { chat, convertMessagesToModelMessages, maxIterations, toolDefinition } from "@tanstack/ai"
import { agentSkillNames, buildSkillInstructions, getAgentSkills, getToolCategoriesFromSkills } from "./agentSkills.js"
import type { ToolResultStore } from "./buildWorkerTools.js"
import { buildWorkerTools } from "./buildWorkerTools.js"
import { getAdapter } from "./provider.js"
import { toolCategories } from "./toolCategories.js"
import { executeWorkerRoute } from "./tools/routeExecutor.js"

const MAX_SUBAGENT_DEPTH = 2
const MAX_SUBAGENT_ITERATIONS = 5

export interface SubagentContext {
    db: any
    redis: any
    streamKey: string
    idOrganization: string
    idYear: string | null
    customInstructions: string | null
    currentDepth: number
    parentToolResultStore: ToolResultStore
}

export interface SubagentTokenUsage {
    inputTokens: number
    outputTokens: number
}

export function buildSubagentTool(context: SubagentContext) {
    const allSkills = getAgentSkills([
        ...agentSkillNames,
    ])
    const skillsDescription = allSkills.map((s) => `- ${s.name} : ${s.description}`).join("\n")

    const def = toolDefinition({
        name: "delegate_to_subagent",
        description: `Déléguer une tâche à un sous-agent spécialisé. Choisis les compétences nécessaires pour la tâche.

Compétences disponibles :
${skillsDescription}

Le sous-agent a accès uniquement aux outils liés aux compétences choisies. Il exécute la tâche et retourne le résultat.
Choisis le minimum de compétences nécessaires pour accomplir la tâche.
Le sous-agent hérite de l'exercice fiscal sélectionné (idYear). Si aucun exercice n'est sélectionné, le sous-agent demandera confirmation avant de continuer.`,
        inputSchema: {
            type: "object" as const,
            properties: {
                skills: {
                    type: "array" as const,
                    items: {
                        type: "string" as const,
                        enum: [
                            ...agentSkillNames,
                        ],
                    },
                    description: "Les compétences à attribuer au sous-agent.",
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
            required: [
                "skills",
                "task",
            ] as const,
        },
    })

    return {
        tool: def.server(async (args) => {
            const {
                skills: skillNames,
                task,
                context: taskContext,
            } = args as {
                skills: string[]
                task: string
                context?: string
            }
            return runSubagent({
                ...context,
                skillNames,
                task,
                taskContext,
            })
        }),
        tokenUsage: {
            inputTokens: 0,
            outputTokens: 0,
        } as SubagentTokenUsage,
    }
}

async function runSubagent(
    params: SubagentContext & {
        skillNames: string[]
        task: string
        taskContext?: string
    },
): Promise<unknown> {
    const {
        db,
        redis,
        streamKey,
        idOrganization,
        idYear,
        customInstructions,
        currentDepth,
        skillNames,
        task,
        taskContext,
    } = params

    if (currentDepth >= MAX_SUBAGENT_DEPTH) {
        return {
            error: `Profondeur maximale de délégation atteinte (${MAX_SUBAGENT_DEPTH}). Impossible de déléguer davantage.`,
        }
    }

    const skills = getAgentSkills(skillNames)
    if (skills.length === 0) {
        return {
            error: `Aucune compétence valide fournie. Compétences disponibles : ${agentSkillNames.join(", ")}`,
        }
    }

    const depth = currentDepth + 1
    const skillLabel = skills.map((s) => s.name).join(", ")

    // Publish subagent start event
    await redis.publish(
        streamKey,
        JSON.stringify({
            type: "SUBAGENT_RUN_START",
            skills: skillLabel,
            depth,
            task,
            timestamp: Date.now(),
        }),
    )

    try {
        // Compose tools from selected skills
        const filteredCategories = getToolCategoriesFromSkills(skills, toolCategories)
        const toolResultStore: ToolResultStore = new Map()

        const tools = buildWorkerTools({
            categories: filteredCategories,
            db,
            idOrganization,
            executeRoute: async (pathSuffix, body) => executeWorkerRoute(db, idOrganization, pathSuffix, body),
            toolResultStore,
        })

        // If depth allows, add recursive subagent tool
        if (depth < MAX_SUBAGENT_DEPTH) {
            const nestedSubagent = buildSubagentTool({
                db,
                redis,
                streamKey,
                idOrganization,
                idYear,
                customInstructions,
                currentDepth: depth,
                parentToolResultStore: toolResultStore,
            })
            tools.push(nestedSubagent.tool)
        }

        // Build system prompt entirely from skill instructions
        const skillInstructions = buildSkillInstructions(skills)
        let systemPrompt = `Tu es un sous-agent comptable spécialisé. Exécute la tâche demandée de manière concise et professionnelle.\nRéponds toujours en français.\n\n${skillInstructions}`
        if (taskContext) {
            systemPrompt += `\n\n## Contexte fourni par l'agent parent\n\n${taskContext}`
        }
        if (idYear) {
            systemPrompt += `\n\n## Exercice fiscal\n\nL'exercice fiscal courant a l'identifiant : "${idYear}". Utilise cet identifiant pour tous les appels d'outil nécessitant un idYear.`
        } else {
            systemPrompt += `\n\n## Exercice fiscal (IMPORTANT)\n\nAucun exercice fiscal n'est sélectionné. Tu DOIS appeler "read_all_years" pour obtenir la liste des exercices disponibles avant tout appel d'outil nécessitant un idYear.\n- Si un seul exercice existe, utilise-le automatiquement.\n- Si plusieurs exercices existent, retourne la liste à l'agent parent et demande confirmation avant de continuer.`
        }
        if (params.customInstructions?.trim()) {
            systemPrompt += `\n\n## Instructions personnalisées de l'utilisateur\n\n${params.customInstructions.trim()}`
        }

        // Build messages — subagent starts fresh with just the delegated task
        const uiMessages = [
            {
                id: `subagent-${Date.now()}`,
                role: "user" as const,
                parts: [
                    {
                        type: "text",
                        content: task,
                    },
                ],
            },
        ]

        const adapter = getAdapter()
        const modelMessages = convertMessagesToModelMessages(uiMessages as any)

        const stream = chat({
            adapter,
            messages: modelMessages as any,
            tools,
            systemPrompts: [
                systemPrompt,
            ],
            agentLoopStrategy: maxIterations(MAX_SUBAGENT_ITERATIONS),
        })

        let accumulatedContent = ""
        let inputTokens = 0
        let outputTokens = 0

        for await (const chunk of stream) {
            // Forward chunks to Redis with subagent metadata
            const enrichedChunk = {
                ...(chunk as any),
                subagentSkills: skillLabel,
                depth,
            }
            await redis.publish(streamKey, JSON.stringify(enrichedChunk))

            if (chunk.type === "TEXT_MESSAGE_CONTENT" && "delta" in chunk && typeof (chunk as any).delta === "string") {
                accumulatedContent += (chunk as any).delta
            }

            if (chunk.type === "RUN_FINISHED" && "usage" in chunk) {
                const usage = (chunk as any).usage
                if (usage) {
                    inputTokens += Number(usage.promptTokens ?? 0)
                    outputTokens += Number(usage.completionTokens ?? 0)
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
                skills: skillLabel,
                depth,
                timestamp: Date.now(),
                inputTokens,
                outputTokens,
            }),
        )

        return {
            skills: skillLabel,
            result: accumulatedContent || "(Aucun résultat)",
            tokenUsage: {
                inputTokens,
                outputTokens,
            },
        }
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)

        await redis.publish(
            streamKey,
            JSON.stringify({
                type: "SUBAGENT_RUN_END",
                skills: skillLabel,
                depth,
                timestamp: Date.now(),
                error: errorMsg,
                inputTokens: 0,
                outputTokens: 0,
            }),
        )

        return {
            error: `Erreur du sous-agent : ${errorMsg}`,
        }
    }
}
