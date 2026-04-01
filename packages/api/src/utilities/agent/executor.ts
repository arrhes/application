import { generateId, models } from "@arrhes/application-metadata"
import { chat, convertMessagesToModelMessages, maxIterations, toolDefinition } from "@tanstack/ai"
import { eq } from "drizzle-orm"
import type { Context } from "hono"
import type { ApiEnv } from "../apiFactory.js"
import type { getEnv } from "../getEnv.js"
import { buildToolsFromCategories, type ToolResultStore } from "./buildTools.js"
import { getAdapter } from "./provider.js"
import { searchDocumentation } from "./searchDocumentation.js"
import { type AgentContext, buildSystemPrompt } from "./systemPrompt.js"
import { toolCategories } from "./toolCategories.js"
import type { YearDataCache } from "./yearDataCache.js"

type Env = ReturnType<typeof getEnv>

/**
 * UIMessage as sent by TanStack AI's fetchServerSentEvents.
 * Has `parts` array instead of `content` string.
 * The `chat()` function handles UIMessage→ModelMessage conversion internally.
 */
interface UIMessage {
    id: string
    role: "user" | "assistant" | "system"
    parts: unknown[]
    createdAt?: unknown
}

/**
 * Execute the agent's tool-calling loop (Pass 2).
 * Receives category names from the router, builds tools for those categories,
 * runs the LLM with tools, persists messages to DB, and returns a stream.
 */
export function executeAgent(parameters: {
    messages: UIMessage[]
    categoryNames: string[]
    context: Context<ApiEnv>
    env: Env
    idOrganization: string
    idAgentSession: string
    appFetch: (request: Request) => Promise<Response>
    agentContext?: AgentContext
    yearDataCache?: YearDataCache
}) {
    const adapter = getAdapter(parameters.env)

    // Shared store for tool results — lets process_array reference previous
    // tool outputs by name instead of requiring the LLM to re-send the data
    const toolResultStore: ToolResultStore = new Map()

    // Select only the requested categories
    const selectedCategories = toolCategories.filter((c) => parameters.categoryNames.includes(c.name))

    // Build tools with auto-injected idOrganization
    const tools = buildToolsFromCategories({
        categories: selectedCategories,
        executeRoute: async (path, body) => {
            return executeRouteInternally({
                context: parameters.context,
                appFetch: parameters.appFetch,
                path,
                body: {
                    ...body,
                    idOrganization: parameters.idOrganization,
                },
            })
        },
        yearDataCache: parameters.yearDataCache,
        toolResultStore,
    })

    // Add documentation search tool if the "documentation" category is selected
    if (parameters.categoryNames.includes("documentation")) {
        const docTool = toolDefinition({
            name: "search_documentation",
            description:
                "Rechercher dans la documentation d'Arrhes. Couvre les concepts comptables (partie double, bilan, compte de résultat, plan comptable général), le glossaire des termes comptables, les guides d'utilisation de l'application et la documentation API. Utilise des mots-clés en français.",
            inputSchema: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description:
                            "Mots-clés de recherche en français. Exemples : 'partie double', 'compte 411 client', 'saisir écriture', 'bilan actif passif'.",
                    },
                },
                required: ["query"],
            },
        }).server(async (args) => {
            const { query } = args as { query: string }
            return await searchDocumentation(query)
        })
        tools.push(docTool)
    }

    // Always add the array utility tool — allows the LLM to accurately count,
    // sort, filter, and slice large arrays returned by read_all tools.
    // Uses the toolResultStore to reference previous tool results by name,
    // so the LLM doesn't have to re-send the entire array in its arguments.
    const arrayTool = toolDefinition({
        name: "process_array",
        description:
            "Traiter un tableau de données retourné par un outil précédent. Référence le résultat d'un outil via son nom (source_tool). Utilise cet outil pour compter, trier, filtrer ou extraire des éléments. IMPORTANT : utilise toujours cet outil au lieu de compter ou trier manuellement.",
        inputSchema: {
            type: "object",
            properties: {
                source_tool: {
                    type: "string",
                    description:
                        "Le nom de l'outil dont le résultat doit être traité. Ex: 'read_all_entries', 'read_all_accounts', 'read_all_journals'. Le résultat de cet outil doit avoir été obtenu dans un appel précédent.",
                },
                path: {
                    type: "string",
                    description:
                        "Chemin vers le tableau dans le résultat si celui-ci est un objet. Ex: 'results' si le résultat est { results: [...] }. Laisser vide si le résultat est directement un tableau.",
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
                    description:
                        "L'opération à appliquer : 'length' (nombre d'éléments), 'sort' (trier), 'filter' (filtrer), 'slice' (extraire une portion), 'find' (trouver un élément), 'map' (extraire un champ), 'unique_values' (valeurs uniques d'un champ), 'sum' (somme d'un champ numérique), 'sort_and_slice' (trier PUIS extraire une portion — combine sort + slice en un seul appel, nécessite field + order + start/end).",
                },
                field: {
                    type: "string",
                    description:
                        "Le champ sur lequel opérer (pour sort, filter, map, unique_values, sum). Ex: 'label', 'date', 'debit'.",
                },
                order: {
                    type: "string",
                    enum: ["asc", "desc"],
                    description: "Ordre de tri pour l'opération 'sort'. Par défaut : 'asc'.",
                },
                value: {
                    type: "string",
                    description:
                        "Valeur de comparaison pour 'filter' et 'find'. Supporte les préfixes : '>' '<' '>=' '<=' '!=' pour les comparaisons numériques, ou recherche textuelle par défaut.",
                },
                start: {
                    type: "number",
                    description: "Index de début pour l'opération 'slice'. Par défaut : 0.",
                },
                end: {
                    type: "number",
                    description: "Index de fin pour l'opération 'slice'.",
                },
            },
            required: ["source_tool", "operation"],
        },
    }).server(async (args) => {
        const typedArgs = args as ProcessArrayArgs
        return processArray(typedArgs, toolResultStore)
    })
    tools.push(arrayTool)

    // Run the chat with tools
    // Convert UIMessages to ModelMessages (chat() requires ModelMessage[])
    const modelMessages = convertMessagesToModelMessages(parameters.messages as any)
    const dynamicSystemPrompt = buildSystemPrompt(parameters.agentContext)
    const stream = chat({
        adapter,
        messages: modelMessages as any,
        tools,
        systemPrompts: [dynamicSystemPrompt],
        agentLoopStrategy: maxIterations(10),
    })

    return stream
}

/**
 * Execute a route handler internally by dispatching through the Hono app's fetch.
 * This reuses the existing auth context (cookies/bearer) and DB connection.
 *
 * Returns a structured error object instead of throwing, so the LLM can
 * interpret the error and respond to the user gracefully.
 */
async function executeRouteInternally(parameters: {
    context: Context<ApiEnv>
    appFetch: (request: Request) => Promise<Response>
    path: string
    body: Record<string, unknown>
}): Promise<unknown> {
    const { context, appFetch, path, body } = parameters

    try {
        // Create an internal Request to pass through the Hono router
        const internalRequest = new Request(`http://internal${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: context.req.header("Cookie") ?? "",
                Authorization: context.req.header("Authorization") ?? "",
                "X-Organization-Id": context.req.header("X-Organization-Id") ?? "",
            },
            body: JSON.stringify(body),
        })

        // Dispatch through the Hono app's fetch handler
        const response = await appFetch(internalRequest)

        if (!response.ok) {
            const errorText = await response.text()
            // Return error as data so the LLM can handle it gracefully
            return {
                error: true,
                statusCode: response.status,
                message: `Erreur lors de l'exécution de ${path}: ${response.status} - ${errorText}`,
            }
        }

        return await response.json()
    } catch (error) {
        // Catch network/runtime errors and return as structured data
        const errorMessage = error instanceof Error ? error.message : String(error)
        return {
            error: true,
            statusCode: 500,
            message: `Erreur interne lors de l'exécution de ${path}: ${errorMessage}`,
        }
    }
}

// ─── Array processing tool ───────────────────────────────────────────────────

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
    if (item && typeof item === "object" && field in item) {
        return (item as Record<string, unknown>)[field]
    }
    return undefined
}

function compareValues(a: unknown, b: unknown, order: "asc" | "desc"): number {
    const aVal = a ?? ""
    const bVal = b ?? ""
    const multiplier = order === "desc" ? -1 : 1

    if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * multiplier
    }

    return String(aVal).localeCompare(String(bVal), "fr") * multiplier
}

function matchesValue(fieldVal: unknown, comparison: string): boolean {
    const strVal = String(fieldVal ?? "")
    const numVal = Number(fieldVal)
    const isNumeric = !Number.isNaN(numVal)

    // Numeric comparisons
    if (comparison.startsWith(">=") && isNumeric) return numVal >= Number(comparison.slice(2))
    if (comparison.startsWith("<=") && isNumeric) return numVal <= Number(comparison.slice(2))
    if (comparison.startsWith("!=")) return strVal !== comparison.slice(2)
    if (comparison.startsWith(">") && isNumeric) return numVal > Number(comparison.slice(1))
    if (comparison.startsWith("<") && isNumeric) return numVal < Number(comparison.slice(1))

    // Text: case-insensitive contains
    return strVal.toLowerCase().includes(comparison.toLowerCase())
}

/**
 * Resolve the array from the tool result store and an optional path.
 * Returns the array or an error object.
 */
function resolveArray(
    args: ProcessArrayArgs,
    store: ToolResultStore,
): { array: unknown[] } | { error: string; available_tools: string[] } {
    const result = store.get(args.source_tool)
    if (result === undefined) {
        return {
            error: `Aucun résultat trouvé pour l'outil "${args.source_tool}". Appelle d'abord cet outil avant d'utiliser process_array.`,
            available_tools: [...store.keys()],
        }
    }

    // Navigate into the result if a path is specified
    let data: unknown = result
    if (args.path) {
        for (const segment of args.path.split(".")) {
            if (data && typeof data === "object" && segment in data) {
                data = (data as Record<string, unknown>)[segment]
            } else {
                return {
                    error: `Le chemin "${args.path}" n'existe pas dans le résultat de "${args.source_tool}".`,
                    available_tools: [...store.keys()],
                }
            }
        }
    }

    if (!Array.isArray(data)) {
        return {
            error: `Le résultat de "${args.source_tool}"${args.path ? ` au chemin "${args.path}"` : ""} n'est pas un tableau.`,
            available_tools: [...store.keys()],
        }
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
                if (!field) return { error: "Le champ 'field' est requis pour l'opération 'sort'." }
                const sorted = [...array].sort((a, b) =>
                    compareValues(getFieldValue(a, field), getFieldValue(b, field), order ?? "asc"),
                )
                return sorted
            }

            case "filter": {
                if (!field || value === undefined) {
                    return { error: "Les champs 'field' et 'value' sont requis pour l'opération 'filter'." }
                }
                const filtered = array.filter((item) => matchesValue(getFieldValue(item, field), value))
                return { results: filtered, length: filtered.length }
            }

            case "slice": {
                const sliced = array.slice(start ?? 0, end)
                return { results: sliced, length: sliced.length, totalLength: array.length }
            }

            case "find": {
                if (!field || value === undefined) {
                    return { error: "Les champs 'field' et 'value' sont requis pour l'opération 'find'." }
                }
                const found = array.find((item) => matchesValue(getFieldValue(item, field), value))
                return found ?? { error: "Aucun élément trouvé." }
            }

            case "map": {
                if (!field) return { error: "Le champ 'field' est requis pour l'opération 'map'." }
                const mapped = array.map((item) => getFieldValue(item, field))
                return { values: mapped, length: mapped.length }
            }

            case "unique_values": {
                if (!field) return { error: "Le champ 'field' est requis pour l'opération 'unique_values'." }
                const values = array.map((item) => getFieldValue(item, field))
                const unique = [...new Set(values.map((v) => String(v ?? "")))]
                return { values: unique, length: unique.length }
            }

            case "sum": {
                if (!field) return { error: "Le champ 'field' est requis pour l'opération 'sum'." }
                let sum = 0
                for (const item of array) {
                    const val = Number(getFieldValue(item, field))
                    if (!Number.isNaN(val)) sum += val
                }
                return { sum, count: array.length }
            }

            case "sort_and_slice": {
                if (!field) return { error: "Le champ 'field' est requis pour l'opération 'sort_and_slice'." }
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

/**
 * Persist an assistant message to the database.
 */
export async function persistAssistantMessage(parameters: {
    context: Context<ApiEnv>
    idAgentSession: string
    content: string
    toolCalls?: unknown
    toolResults?: unknown
    usedTools?: string[]
    state: "completed" | "streaming" | "error"
}): Promise<string> {
    const id = generateId()
    await parameters.context.var.clients.sql.insert(models.agentMessage).values({
        id,
        idAgentSession: parameters.idAgentSession,
        role: "assistant",
        content: parameters.content,
        toolCalls: parameters.toolCalls ?? null,
        toolResults: parameters.toolResults ?? null,
        usedTools: parameters.usedTools ?? null,
        state: parameters.state,
        createdAt: new Date().toISOString(),
    })
    return id
}

/**
 * Update an existing message's content and state.
 */
export async function updateAssistantMessage(parameters: {
    context: Context<ApiEnv>
    messageId: string
    content: string
    toolCalls?: unknown
    toolResults?: unknown
    usedTools?: string[]
    state: "completed" | "streaming" | "error"
}): Promise<void> {
    await parameters.context.var.clients.sql
        .update(models.agentMessage)
        .set({
            content: parameters.content,
            toolCalls: parameters.toolCalls ?? null,
            toolResults: parameters.toolResults ?? null,
            usedTools: parameters.usedTools ?? null,
            state: parameters.state,
        })
        .where(eq(models.agentMessage.id, parameters.messageId))
}
