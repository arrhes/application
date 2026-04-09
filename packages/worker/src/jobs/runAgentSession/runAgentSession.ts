import { models } from "@arrhes/application-metadata"
import { chat, convertMessagesToModelMessages, maxIterations, toolDefinition } from "@tanstack/ai"
import { eq } from "drizzle-orm"
import { ContextClients } from "#src/clients/contextClients.js"
import { buildWorkerTools, type ToolResultStore } from "./buildWorkerTools.js"
import { getAdapter } from "./provider.js"
import { buildSystemPrompt } from "./systemPrompt.js"
import { toolCategories } from "./toolCategories.js"
import { executeWorkerRoute } from "./tools/routeExecutor.js"

export interface RunAgentSessionJobArgs {
    idAgentMessage: string
    idWorkerJob: string
}

export type RunAgentSessionJob = {
    fn: "runAgentSession"
    args: [RunAgentSessionJobArgs]
}

// ─── Array processing (copied from API executor) ──────────────────────────────

interface ProcessArrayArgs {
    source_tool: string
    path?: string
    operation: "length" | "sort" | "filter" | "slice" | "find" | "map" | "unique_values" | "sum" | "sort_and_slice"
    field?: string
    order?: "asc" | "desc"
    value?: string
    start?: number
    end?: number
}

function getFieldValue(item: unknown, field: string): unknown {
    if (item && typeof item === "object" && field in item) return (item as Record<string, unknown>)[field]
    return undefined
}

function compareValues(a: unknown, b: unknown, order: "asc" | "desc"): number {
    const aVal = a ?? ""
    const bVal = b ?? ""
    const multiplier = order === "desc" ? -1 : 1
    if (typeof aVal === "number" && typeof bVal === "number") return (aVal - bVal) * multiplier
    return String(aVal).localeCompare(String(bVal), "fr") * multiplier
}

function matchesValue(fieldVal: unknown, comparison: string): boolean {
    const strVal = String(fieldVal ?? "")
    const numVal = Number(fieldVal)
    const isNumeric = !Number.isNaN(numVal)
    if (comparison.startsWith(">=") && isNumeric) return numVal >= Number(comparison.slice(2))
    if (comparison.startsWith("<=") && isNumeric) return numVal <= Number(comparison.slice(2))
    if (comparison.startsWith("!=")) return strVal !== comparison.slice(2)
    if (comparison.startsWith(">") && isNumeric) return numVal > Number(comparison.slice(1))
    if (comparison.startsWith("<") && isNumeric) return numVal < Number(comparison.slice(1))
    return strVal.toLowerCase().includes(comparison.toLowerCase())
}

function resolveArray(
    args: ProcessArrayArgs,
    store: ToolResultStore,
): { array: unknown[] } | { error: string; available_tools: string[] } {
    const result = store.get(args.source_tool)
    if (result === undefined)
        return {
            error: `Aucun résultat trouvé pour l'outil "${args.source_tool}". Appelle d'abord cet outil.`,
            available_tools: [...store.keys()],
        }
    let data: unknown = result
    if (args.path) {
        for (const segment of args.path.split(".")) {
            if (data && typeof data === "object" && segment in data) data = (data as Record<string, unknown>)[segment]
            else
                return {
                    error: `Le chemin "${args.path}" n'existe pas dans "${args.source_tool}".`,
                    available_tools: [...store.keys()],
                }
        }
    }
    if (!Array.isArray(data))
        return {
            error: `Le résultat de "${args.source_tool}" n'est pas un tableau.`,
            available_tools: [...store.keys()],
        }
    return { array: data }
}

function processArray(args: ProcessArrayArgs, store: ToolResultStore): unknown {
    const { operation, field, order, value, start, end } = args
    try {
        const resolved = resolveArray(args, store)
        if ("error" in resolved) return resolved
        const { array } = resolved
        switch (operation) {
            case "length":
                return { length: array.length }
            case "sort": {
                if (!field) return { error: "Le champ 'field' est requis pour 'sort'." }
                return [...array].sort((a, b) =>
                    compareValues(getFieldValue(a, field), getFieldValue(b, field), order ?? "asc"),
                )
            }
            case "filter": {
                if (!field || value === undefined)
                    return { error: "Les champs 'field' et 'value' sont requis pour 'filter'." }
                const filtered = array.filter((item) => matchesValue(getFieldValue(item, field), value))
                return { results: filtered, length: filtered.length }
            }
            case "slice": {
                const sliced = array.slice(start ?? 0, end)
                return { results: sliced, length: sliced.length, totalLength: array.length }
            }
            case "find": {
                if (!field || value === undefined)
                    return { error: "Les champs 'field' et 'value' sont requis pour 'find'." }
                const found = array.find((item) => matchesValue(getFieldValue(item, field), value))
                return found ?? { error: "Aucun élément trouvé." }
            }
            case "map": {
                if (!field) return { error: "Le champ 'field' est requis pour 'map'." }
                const mapped = array.map((item) => getFieldValue(item, field))
                return { values: mapped, length: mapped.length }
            }
            case "unique_values": {
                if (!field) return { error: "Le champ 'field' est requis pour 'unique_values'." }
                const values = array.map((item) => getFieldValue(item, field))
                const unique = [...new Set(values.map((v) => String(v ?? "")))]
                return { values: unique, length: unique.length }
            }
            case "sum": {
                if (!field) return { error: "Le champ 'field' est requis pour 'sum'." }
                let sum = 0
                for (const item of array) {
                    const val = Number(getFieldValue(item, field))
                    if (!Number.isNaN(val)) sum += val
                }
                return { sum, count: array.length }
            }
            case "sort_and_slice": {
                if (!field) return { error: "Le champ 'field' est requis pour 'sort_and_slice'." }
                const sortedArr = [...array].sort((a, b) =>
                    compareValues(getFieldValue(a, field), getFieldValue(b, field), order ?? "asc"),
                )
                const slicedArr = sortedArr.slice(start ?? 0, end)
                return { results: slicedArr, length: slicedArr.length, totalLength: array.length }
            }
            default:
                return { error: `Opération inconnue : ${operation}` }
        }
    } catch (err) {
        return { error: `Erreur lors du traitement : ${err instanceof Error ? err.message : String(err)}` }
    }
}

// ─── Main job ────────────────────────────────────────────────────────────────

export async function runAgentSession(args: RunAgentSessionJobArgs): Promise<void> {
    const { idAgentMessage, idWorkerJob } = args
    const db = ContextClients.sql
    const redis = ContextClients.redis

    // Mark job as running
    await db
        .update(models.workerJob)
        .set({ status: "running", lastUpdatedAt: new Date().toISOString() })
        .where(eq(models.workerJob.id, idWorkerJob))

    // Load the assistant message placeholder
    const msgRows = await db
        .select()
        .from(models.agentMessage)
        .where(eq(models.agentMessage.id, idAgentMessage))
        .limit(1)
    const agentMessage = msgRows.at(0)
    if (!agentMessage) throw new Error(`Agent message not found: ${idAgentMessage}`)

    const streamKey = agentMessage.streamKey
    if (!streamKey) throw new Error(`Agent message has no streamKey: ${idAgentMessage}`)

    // Load the session (contains idOrganization, idUser, idYear, customInstructions)
    const sessionRows = await db
        .select()
        .from(models.agentSession)
        .where(eq(models.agentSession.id, agentMessage.idAgentSession))
        .limit(1)
    const session = sessionRows.at(0)
    if (!session) throw new Error(`Agent session not found: ${agentMessage.idAgentSession}`)

    const { idOrganization, idYear, customInstructions } = session

    // Load conversation history (all completed messages before this one, ordered ASC)
    const historyRows = await db
        .select()
        .from(models.agentMessage)
        .where(eq(models.agentMessage.idAgentSession, agentMessage.idAgentSession))
        .orderBy(models.agentMessage.createdAt)

    // Build UIMessages from DB rows (excluding the current assistant placeholder)
    const uiMessages = historyRows
        .filter((m) => m.id !== idAgentMessage && (m.state === "completed" || m.role === "user"))
        .map((m) => ({
            id: m.id,
            role: m.role as "user" | "assistant" | "tool",
            parts:
                m.role === "user"
                    ? [{ type: "text", content: m.content ?? "" }]
                    : m.toolCalls
                      ? [{ type: "tool-call", toolCalls: m.toolCalls }]
                      : [{ type: "text", content: m.content ?? "" }],
            createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
        }))

    // Classify intent using all categories (same as router.ts in API does)
    // For simplicity in worker we use all categories — avoids the router LLM call
    const allCategoryNames = toolCategories.map((c) => c.name)
    const selectedCategories = toolCategories.filter((c) => allCategoryNames.includes(c.name))

    const toolResultStore: ToolResultStore = new Map()

    const tools = buildWorkerTools({
        categories: selectedCategories,
        db,
        idOrganization,
        executeRoute: async (pathSuffix, body) => executeWorkerRoute(db, idOrganization, pathSuffix, body),
        toolResultStore,
    })

    // Add process_array tool
    const arrayTool = toolDefinition({
        name: "process_array",
        description:
            "Traiter un tableau de données retourné par un outil précédent. Référence le résultat d'un outil via son nom (source_tool). Utilise cet outil pour compter, trier, filtrer ou extraire des éléments.",
        inputSchema: {
            type: "object",
            properties: {
                source_tool: { type: "string", description: "Le nom de l'outil dont le résultat doit être traité." },
                path: {
                    type: "string",
                    description: "Chemin vers le tableau dans le résultat si celui-ci est un objet.",
                },
                operation: {
                    type: "string",
                    enum: [
                        "length",
                        "sort",
                        "filter",
                        "slice",
                        "find",
                        "map",
                        "unique_values",
                        "sum",
                        "sort_and_slice",
                    ],
                },
                field: { type: "string" },
                order: { type: "string", enum: ["asc", "desc"] },
                value: { type: "string" },
                start: { type: "number" },
                end: { type: "number" },
            },
            required: ["source_tool", "operation"],
        },
    }).server(async (args) => processArray(args as ProcessArrayArgs, toolResultStore))
    tools.push(arrayTool)

    const systemPrompt = buildSystemPrompt({
        idYear: idYear ?? undefined,
        customInstructions: customInstructions ?? undefined,
    })

    const adapter = getAdapter()
    const modelMessages = convertMessagesToModelMessages(uiMessages as any)

    let accumulatedContent = ""
    const accumulatedToolCalls: unknown[] = []
    const usedToolNames = new Set<string>()

    try {
        const stream = chat({
            adapter,
            messages: modelMessages as any,
            tools,
            systemPrompts: [systemPrompt],
            agentLoopStrategy: maxIterations(10),
        })

        for await (const chunk of stream) {
            // Publish every chunk as a Redis message for the SSE subscriber
            await redis.publish(streamKey, JSON.stringify(chunk))

            // Accumulate content for final DB persist
            if (chunk.type === "TEXT_MESSAGE_CONTENT" && "delta" in chunk) {
                accumulatedContent += (chunk as any).delta ?? ""
            }
            if (chunk.type === "TOOL_CALL_END" && "toolName" in chunk) {
                usedToolNames.add((chunk as any).toolName)
                accumulatedToolCalls.push(chunk)
            }
        }

        // Persist the completed assistant message
        await db
            .update(models.agentMessage)
            .set({
                state: "completed",
                content: accumulatedContent || null,
                toolCalls: accumulatedToolCalls.length > 0 ? accumulatedToolCalls : null,
                usedTools: usedToolNames.size > 0 ? [...usedToolNames] : null,
            })
            .where(eq(models.agentMessage.id, idAgentMessage))

        // Mark worker job completed
        await db
            .update(models.workerJob)
            .set({ status: "completed", lastUpdatedAt: new Date().toISOString() })
            .where(eq(models.workerJob.id, idWorkerJob))

        // Update session lastUpdatedAt
        await db
            .update(models.agentSession)
            .set({ lastUpdatedAt: new Date().toISOString() })
            .where(eq(models.agentSession.id, agentMessage.idAgentSession))
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error(`[runAgentSession] Error for message ${idAgentMessage}:`, msg)

        await db
            .update(models.agentMessage)
            .set({ state: "error", content: null })
            .where(eq(models.agentMessage.id, idAgentMessage))

        await db
            .update(models.workerJob)
            .set({ status: "error", lastUpdatedAt: new Date().toISOString() })
            .where(eq(models.workerJob.id, idWorkerJob))
    } finally {
        // Always close the stream so the SSE subscriber terminates
        await redis.publish(streamKey, `${streamKey}:close`)
    }
}
