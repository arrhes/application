import { generateId, models } from "@arrhes/application-metadata"
import { chat, convertMessagesToModelMessages, maxIterations, toolDefinition } from "@tanstack/ai"
import { and, asc, eq, sql } from "drizzle-orm"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { getObject } from "#src/utilities/storage/getObject.js"
import { putObject } from "#src/utilities/storage/putObject.js"
import { tokenLimit } from "#src/utilities/variables.js"
import { buildWorkerTools, type ToolResultStore } from "./buildWorkerTools.js"
import { getAdapter } from "./provider.js"
import { buildSubagentTool } from "./subagentTool.js"
import { buildSystemPrompt } from "./systemPrompt.js"
import { toolCategories } from "./toolCategories.js"
import { buildEntryTemplateTool } from "./tools/entryTemplateTool.js"
import { executeWorkerRoute } from "./tools/routeExecutor.js"

export interface RunAgentSessionJobArgs {
    idAgentMessage: string
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

function fixCommonMojibake(text: string) {
    // Heuristic: repair common UTF-8 text interpreted as Latin-1 (e.g. "NumÃ©ro" -> "Numéro").
    if (!/[Ãâ€]/.test(text)) {
        return text
    }

    const repaired = Buffer.from(text, "latin1").toString("utf-8")
    return repaired.includes("�") ? text : repaired
}

const MAX_MESSAGE_CHARACTERS = 16_000

function compressTextForContext(text: string, maxCharacters = MAX_MESSAGE_CHARACTERS) {
    if (text.length <= maxCharacters) {
        return text
    }

    const head = Math.floor(maxCharacters * 0.7)
    const tail = Math.floor(maxCharacters * 0.3)
    return `${text.slice(0, head)}\n\n[...contenu tronqué pour respecter la limite de contexte...]\n\n${text.slice(-tail)}`
}

function stringifyAndCompressForContext(value: unknown, maxCharacters = MAX_MESSAGE_CHARACTERS) {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value ?? {})
    return compressTextForContext(stringValue, maxCharacters)
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

// ─── UIMessage reconstruction ────────────────────────────────────────────────

/**
 * Reconstruct proper UIMessage parts from a DB row.
 * For assistant messages with stored AG-UI tool events, converts them to the
 * tool-call / tool-result format expected by convertMessagesToModelMessages.
 */
function buildAssistantParts(m: { output: string | null; toolCalls: unknown | null }): unknown[] {
    const parts: unknown[] = []

    // Add text content if present
    if (m.output) {
        parts.push({ type: "text", content: compressTextForContext(m.output) })
    }

    // Reconstruct tool-call and tool-result parts from stored AG-UI events
    if (m.toolCalls && Array.isArray(m.toolCalls)) {
        const events = m.toolCalls as Array<Record<string, unknown>>
        // Group events by toolCallId
        const toolCallMap = new Map<string, { name: string; input?: unknown; result?: string }>()
        // Preserve insertion order for deterministic part ordering
        const toolCallOrder: string[] = []

        for (const event of events) {
            const id = event.toolCallId as string | undefined
            if (!id) continue

            if (!toolCallMap.has(id)) {
                toolCallMap.set(id, { name: (event.toolName as string) ?? "" })
                toolCallOrder.push(id)
            }
            const entry = toolCallMap.get(id)!

            if (event.type === "TOOL_CALL_END" && "input" in event) {
                entry.input = event.input
            }
            if (event.type === "TOOL_CALL_END" && "result" in event) {
                entry.result = event.result as string
            }
        }

        for (const id of toolCallOrder) {
            const info = toolCallMap.get(id)!
            parts.push({
                type: "tool-call",
                id,
                name: info.name,
                arguments: stringifyAndCompressForContext(info.input),
                state: "input-complete",
            })
        }
        for (const id of toolCallOrder) {
            const info = toolCallMap.get(id)!
            if (info.result !== undefined) {
                parts.push({
                    type: "tool-result",
                    toolCallId: id,
                    content: compressTextForContext(info.result),
                    state: "complete",
                })
            }
        }
    }

    // Fallback: if no parts were built, add empty text
    if (parts.length === 0) {
        parts.push({ type: "text", content: compressTextForContext(m.output ?? "") })
    }

    return parts
}

// ─── Main job ────────────────────────────────────────────────────────────────

export async function runAgentSession(args: RunAgentSessionJobArgs): Promise<void> {
    const { idAgentMessage } = args
    console.log("[runAgentSession] Starting job", { idAgentMessage })
    const db = ContextClients.sql
    const redis = ContextClients.redis

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
    console.log("[runAgentSession] Session loaded", { idOrganization })

    // Load conversation history (all completed messages before this one, ordered ASC)
    const historyRows = await db
        .select()
        .from(models.agentMessage)
        .where(eq(models.agentMessage.idAgentSession, agentMessage.idAgentSession))
        .orderBy(asc(models.agentMessage.createdAt))

    // Build UIMessages from DB rows. A row may have a nullable userMessage (e.g. delegated/subagent rows),
    // so we only emit a user turn when present. Assistant output is still included when completed.
    // so that convertMessagesToModelMessages gets a proper user→assistant alternation.
    const uiMessages: Array<{ id: string; role: "user" | "assistant"; parts: unknown[]; createdAt?: Date }> = []
    for (const m of historyRows) {
        // Build the user message content, appending resolved references if present
        let userContent = compressTextForContext(m.userMessage ?? "")

        const refs = (m as any).references as Array<{ id: string; type: string; label: string }> | null
        if (refs && refs.length > 0 && m.id === idAgentMessage) {
            // Resolve references for the current message only
            const resolvedParts: string[] = []
            for (const ref of refs) {
                try {
                    let data: unknown = null
                    switch (ref.type) {
                        case "account": {
                            const rows = await db
                                .select()
                                .from(models.account)
                                .where(eq(models.account.id, ref.id))
                                .limit(1)
                            data = rows.at(0) ?? null
                            break
                        }
                        case "entry": {
                            const rows = await db
                                .select()
                                .from(models.entry)
                                .where(eq(models.entry.id, ref.id))
                                .limit(1)
                            data = rows.at(0) ?? null
                            break
                        }
                        case "journal": {
                            const rows = await db
                                .select()
                                .from(models.journal)
                                .where(eq(models.journal.id, ref.id))
                                .limit(1)
                            data = rows.at(0) ?? null
                            break
                        }
                        case "tag": {
                            const rows = await db.select().from(models.tag).where(eq(models.tag.id, ref.id)).limit(1)
                            data = rows.at(0) ?? null
                            break
                        }
                        case "file": {
                            const rows = await db.select().from(models.file).where(eq(models.file.id, ref.id)).limit(1)
                            data = rows.at(0) ?? null
                            break
                        }
                    }
                    if (data) {
                        resolvedParts.push(
                            `### ${ref.type}: ${ref.label}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``,
                        )
                    }
                } catch {
                    // Skip unresolvable references
                }
            }
            if (resolvedParts.length > 0) {
                userContent += `\n\n---\n## Données référencées\n\n${resolvedParts.join("\n\n")}`
            }
        }

        if (m.userMessage) {
            uiMessages.push({
                id: `${m.id}-user`,
                role: "user",
                parts: [{ type: "text", content: userContent }],
                createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
            })
        }

        // Skip the current message's assistant response (it's still streaming/empty)
        if (m.id === idAgentMessage) continue

        // Only add the assistant response if it completed with output or tool calls
        if (m.state === "completed" && (m.output || m.toolCalls)) {
            uiMessages.push({
                id: m.id,
                role: "assistant",
                parts: buildAssistantParts(m),
                createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
            })
        }
    }

    console.log(`[runAgentSession] uiMessages count: ${uiMessages.length}`)

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
            "Traiter une liste de données retourné par un outil précédent. Référence le résultat d'un outil via son nom (source_tool). Utilise cet outil pour compter, trier, filtrer ou extraire des éléments.",
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

    // Add ocr_file tool (premium feature — extracts text from a file and saves it as markdown)
    const ocrTool = toolDefinition({
        name: "ocr_file",
        description:
            "Extraire le texte d'un fichier (image ou PDF) via OCR et sauvegarder le résultat en Markdown. Retourne le nouveau fichier créé. Nécessite l'identifiant du fichier source et de l'exercice.",
        inputSchema: {
            type: "object",
            properties: {
                idFile: { type: "string", description: "L'identifiant du fichier source à traiter." },
                idYear: { type: "string", description: "L'identifiant de l'exercice." },
            },
            required: ["idFile", "idYear"],
        },
    }).server(async (args) => {
        const { idFile, idYear } = args as { idFile: string; idYear: string }
        try {
            const organizationRows = await db
                .select({
                    ocrPagesTotalLeft: models.organization.ocrPagesTotalLeft,
                    ocrPagesTotalUsed: models.organization.ocrPagesTotalUsed,
                })
                .from(models.organization)
                .where(eq(models.organization.id, idOrganization))
                .limit(1)
            const organization = organizationRows.at(0)
            if (!organization) return { error: "Organisation introuvable." }

            const fileRows = await db
                .select()
                .from(models.file)
                .where(
                    and(
                        eq(models.file.idOrganization, idOrganization),
                        eq(models.file.idYear, idYear),
                        eq(models.file.id, idFile),
                    ),
                )
                .limit(1)
            const sourceFile = fileRows.at(0)
            if (!sourceFile) return { error: "Fichier non trouvé." }
            if (!sourceFile.storageKey) return { error: "Le fichier source n'a pas de contenu associé." }

            const storageResponse = await getObject({ storageKey: sourceFile.storageKey })
            const fileBytes = await storageResponse.Body?.transformToByteArray()
            if (!fileBytes) return { error: "Impossible de lire le fichier source." }

            const base64Content = Buffer.from(fileBytes).toString("base64")
            const mimeType = sourceFile.type ?? "application/octet-stream"
            const isImage = mimeType.startsWith("image/")
            const isPdf = mimeType === "application/pdf"
            if (!isImage && !isPdf) {
                return {
                    error: "Le format du fichier n'est pas compatible avec l'OCR (image ou PDF uniquement).",
                }
            }
            const dataUri = `data:${mimeType};base64,${base64Content}`

            const mistralApiKey = ContextEnv.LLM_API_KEY
            if (!mistralApiKey) return { error: "La clé API Mistral n'est pas configurée." }

            const document = isImage
                ? { type: "image_url" as const, image_url: dataUri }
                : { type: "document_url" as const, document_url: dataUri }

            const ocrResponse = await fetch("https://api.mistral.ai/v1/ocr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${mistralApiKey}`,
                },
                body: JSON.stringify({
                    model: "mistral-ocr-latest",
                    document,
                }),
            })

            if (!ocrResponse.ok) {
                const errorText = await ocrResponse.text().catch(() => "")
                return { error: `Erreur Mistral OCR: ${ocrResponse.status} ${errorText}` }
            }

            const ocrResult = (await ocrResponse.json()) as {
                pages?: Array<{ markdown: string }>
            }

            const extractedPagesCount = ocrResult.pages?.length ?? 0
            if (extractedPagesCount <= 0) {
                return { error: "L'extraction OCR n'a retourné aucune page." }
            }

            if (extractedPagesCount > organization.ocrPagesTotalLeft) {
                return { error: "Limite mensuelle de pages OCR atteinte pour votre organisation." }
            }

            const markdownContent = ocrResult.pages?.map((p) => p.markdown).join("\n\n---\n\n")
            if (!markdownContent) return { error: "L'extraction de texte n'a retourné aucun résultat." }

            const normalizedMarkdownContent = fixCommonMojibake(markdownContent)
            const markdownBuffer = Buffer.from(normalizedMarkdownContent, "utf-8")
            const newFileId = generateId()
            const originalName = sourceFile.name ?? sourceFile.reference ?? "document"
            const baseName = originalName.replace(/\.[^.]+$/, "")
            const markdownName = `${baseName}.md`
            const storageKey = `organizations/${idOrganization}/${idYear}/files/${newFileId}`

            const [newFile] = await db
                .insert(models.file)
                .values({
                    id: newFileId,
                    idOrganization: idOrganization,
                    idYear: idYear,
                    idFolder: sourceFile.idFolder,
                    reference: sourceFile.reference,
                    name: markdownName,
                    storageKey: storageKey,
                    type: "text/markdown",
                    size: markdownBuffer.length,
                    createdAt: new Date().toISOString(),
                })
                .returning()

            await putObject({
                storageKey: storageKey,
                contentLength: markdownBuffer.length,
                contentType: "text/markdown; charset=utf-8",
                metadata: { idOrganization, idYear },
                body: markdownBuffer,
            })

            await db.execute(sql`
                UPDATE table_organization
                SET
                    storage_current_usage = storage_current_usage + ${markdownBuffer.length},
                    ocr_current_month_pages_usage = ${organization.ocrPagesTotalUsed + extractedPagesCount},
                    ocr_pages_total_left = GREATEST(ocr_pages_total_left - ${extractedPagesCount}, 0),
                    ocr_pages_total_used = ocr_pages_total_used + ${extractedPagesCount},
                WHERE id = ${idOrganization}
            `)

            toolResultStore.set("ocr_file", newFile)
            return newFile
        } catch (err) {
            return { error: `Erreur OCR : ${err instanceof Error ? err.message : String(err)}` }
        }
    })
    tools.push(ocrTool)

    // Add entry template tool — creates an entry with lines from a predefined template
    const entryTemplateTool = buildEntryTemplateTool({ db, idOrganization, toolResultStore })
    tools.push(entryTemplateTool)

    // Add subagent delegation tool
    const subagentResult = buildSubagentTool({
        db,
        redis,
        streamKey,
        idOrganization,
        idYear,
        customInstructions: customInstructions ?? null,
        currentDepth: 0,
        parentToolResultStore: toolResultStore,
    })
    tools.push(subagentResult.tool)

    // Load file context from session attachedFiles
    const MAX_FILE_CONTEXT_CHARACTERS = 32_000
    let fileContext: string | undefined
    let fileContextTruncated = false

    const allAttachedFiles = (session.attachedFiles ?? []) as Array<{
        idFile: string
        name: string
        mimeType: string
        idOcrFile: string | null
    }>

    console.log(`[runAgentSession] Found ${allAttachedFiles.length} attached files on session`)

    if (allAttachedFiles.length > 0) {
        const fileContextParts: string[] = []
        const failedFiles: string[] = []
        let totalLength = 0

        for (const attachedFile of allAttachedFiles) {
            // Pick the file to read: OCR result for PDF/images, original for text
            const fileIdToRead = attachedFile.idOcrFile ?? attachedFile.idFile
            console.log(
                `[runAgentSession] Reading file "${attachedFile.name}" (fileId=${fileIdToRead}, ocr=${!!attachedFile.idOcrFile})`,
            )

            const fileRows = await db.select().from(models.file).where(eq(models.file.id, fileIdToRead)).limit(1)
            const file = fileRows.at(0)
            if (!file?.storageKey) {
                console.warn(`[runAgentSession] File record not found or no storageKey for id=${fileIdToRead}`)
                failedFiles.push(attachedFile.name)
                continue
            }

            try {
                const storageResponse = await getObject({ storageKey: file.storageKey })
                const body = await storageResponse.Body?.transformToString("utf-8")
                if (!body) {
                    console.warn(
                        `[runAgentSession] Empty body for file "${attachedFile.name}" (storageKey=${file.storageKey})`,
                    )
                    failedFiles.push(attachedFile.name)
                    continue
                }

                const remainingBudget = MAX_FILE_CONTEXT_CHARACTERS - totalLength
                if (remainingBudget <= 0) {
                    fileContextTruncated = true
                    break
                }

                let content = body
                if (content.length > remainingBudget) {
                    content = `${content.slice(0, remainingBudget)}\n\n[...contenu tronqué]`
                    fileContextTruncated = true
                }

                fileContextParts.push(`### ${attachedFile.name} (idFile: ${attachedFile.idFile})\n\n${content}`)
                totalLength += content.length
                console.log(`[runAgentSession] File "${attachedFile.name}" loaded: ${content.length} chars`)
            } catch (error) {
                console.error(
                    `[runAgentSession] Failed to read file "${attachedFile.name}" (storageKey=${file.storageKey}):`,
                    error,
                )
                failedFiles.push(attachedFile.name)
            }
        }

        if (fileContextParts.length > 0) {
            fileContext = fileContextParts.join("\n\n---\n\n")
            if (fileContextTruncated) {
                fileContext +=
                    "\n\n> **Note :** Le contenu des fichiers importés a été tronqué car il dépasse la limite de contexte. Les fichiers les plus anciens sont prioritaires."
            }
            if (failedFiles.length > 0) {
                fileContext += `\n\n> **Note :** Certains fichiers n'ont pas pu être lus : ${failedFiles.join(", ")}.`
            }
        } else if (failedFiles.length > 0) {
            // All files failed to read — still tell the LLM they were attached
            fileContext = `Les fichiers suivants ont été importés par l'utilisateur mais leur contenu n'a pas pu être lu : ${failedFiles.join(", ")}. Informe l'utilisateur qu'une erreur s'est produite lors de la lecture de ses fichiers.`
        }
    }

    console.log(`[runAgentSession] fileContext: ${fileContext ? `${fileContext.length} chars` : "none"}`)

    const systemPrompt = buildSystemPrompt({
        idYear: idYear ?? undefined,
        customInstructions: customInstructions ?? undefined,
        fileContext,
    })

    const adapter = getAdapter()
    console.log("[runAgentSession] Calling convertMessagesToModelMessages")
    const modelMessages = convertMessagesToModelMessages(uiMessages as any)
    console.log(`[runAgentSession] modelMessages count: ${modelMessages.length}, tools count: ${tools.length}`)

    // Estimate token usage and warn if approaching the limit
    const estimatedChars = systemPrompt.length + JSON.stringify(modelMessages).length
    const estimatedTokens = Math.ceil(estimatedChars / 4)
    const contextUsageRatio = estimatedTokens / tokenLimit
    console.log(
        `[runAgentSession] Estimated tokens: ${estimatedTokens}/${tokenLimit} (${Math.round(contextUsageRatio * 100)}%)`,
    )

    if (contextUsageRatio >= 0.8) {
        await redis.publish(
            streamKey,
            JSON.stringify({
                type: "CONTEXT_LIMIT_WARNING",
                estimatedTokens,
                tokenLimit,
                usage: Math.round(contextUsageRatio * 100),
            }),
        )
    }

    const llmInputPayload = JSON.stringify({
        systemPrompts: [systemPrompt],
        messages: modelMessages,
    })

    await db
        .update(models.agentMessage)
        .set({ input: llmInputPayload })
        .where(eq(models.agentMessage.id, idAgentMessage))

    let accumulatedContent = ""
    const accumulatedToolCalls: unknown[] = []
    const usedToolNames = new Set<string>()
    let lastBoundaryContentLength = 0
    let runError: string | null = null
    let capturedInputTokens = 0
    let capturedOutputTokens = 0

    // Periodic checkpoint: flush partial content to DB so page reloads
    // can show already-generated text instead of "..."
    let lastCheckpointLength = 0
    let lastCheckpointTime = Date.now()
    const CHECKPOINT_MIN_CHARS = 200
    const CHECKPOINT_INTERVAL_MS = 3000

    const maybeCheckpoint = () => {
        const charsSinceCheckpoint = accumulatedContent.length - lastCheckpointLength
        const msSinceCheckpoint = Date.now() - lastCheckpointTime
        if (
            charsSinceCheckpoint >= CHECKPOINT_MIN_CHARS ||
            (charsSinceCheckpoint > 0 && msSinceCheckpoint >= CHECKPOINT_INTERVAL_MS)
        ) {
            const contentSnapshot = accumulatedContent
            const toolCallsSnapshot = accumulatedToolCalls.length > 0 ? [...accumulatedToolCalls] : null
            lastCheckpointLength = accumulatedContent.length
            lastCheckpointTime = Date.now()
            // Fire-and-forget — non-critical, don't block the stream
            db.update(models.agentMessage)
                .set({
                    output: contentSnapshot || null,
                    toolCalls: toolCallsSnapshot,
                    usedTools: usedToolNames.size > 0 ? [...usedToolNames] : null,
                })
                .where(eq(models.agentMessage.id, idAgentMessage))
                .catch(() => { })
        }
    }

    try {
        console.log("[runAgentSession] Starting chat() stream")
        const stream = chat({
            adapter,
            messages: modelMessages as any,
            tools,
            systemPrompts: [systemPrompt],
            agentLoopStrategy: maxIterations(20),
        })

        for await (const chunk of stream) {
            console.log(`[runAgentSession] chunk: ${chunk.type}`)
            // Publish every chunk as a Redis message for the SSE subscriber
            try {
                await redis.publish(streamKey, JSON.stringify(chunk))
            } catch (error: unknown) {
                const publishError = error instanceof Error ? error.message : String(error)
                console.error(`[runAgentSession] Redis publish failed for message ${idAgentMessage}:`, publishError)
                throw error
            }

            if (chunk.type === "RUN_ERROR") {
                const errorMsg = (chunk as any).message ?? (chunk as any).error ?? "Unknown error"
                console.error("[runAgentSession] RUN_ERROR details:", JSON.stringify(chunk))
                runError = typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
            }

            // Accumulate content for final DB persist
            if (chunk.type === "TEXT_MESSAGE_CONTENT" && "delta" in chunk && typeof (chunk as any).delta === "string") {
                accumulatedContent += (chunk as any).delta
                maybeCheckpoint()
            }
            if (chunk.type === "TOOL_CALL_START" && "toolName" in chunk) {
                // Emit text boundary if text has been accumulated since the last boundary
                if (accumulatedContent.length > lastBoundaryContentLength) {
                    accumulatedToolCalls.push({ type: "TEXT_BOUNDARY", contentLength: accumulatedContent.length })
                    lastBoundaryContentLength = accumulatedContent.length
                }
                accumulatedToolCalls.push(chunk)
            }
            if (chunk.type === "TOOL_CALL_END" && "toolName" in chunk) {
                usedToolNames.add((chunk as any).toolName)
                accumulatedToolCalls.push(chunk)
                maybeCheckpoint()
            }
            if (chunk.type === "RUN_FINISHED" && "usage" in chunk) {
                const usage = (chunk as any).usage
                if (usage) {
                    capturedInputTokens += Number(usage.promptTokens ?? 0)
                    capturedOutputTokens += Number(usage.completionTokens ?? 0)
                }
            }
        }

        console.log(
            `[runAgentSession] Stream ended. content=${accumulatedContent.length} chars, toolCalls=${accumulatedToolCalls.length}, usedTools=${[...usedToolNames].join(",")}${runError ? `, error=${runError}` : ""}`,
        )

        if (runError) {
            // Stream completed but with a RUN_ERROR (rate limit, model error, etc.)
            await db
                .update(models.agentMessage)
                .set({
                    state: "error",
                    output: accumulatedContent || runError,
                    toolCalls: accumulatedToolCalls.length > 0 ? accumulatedToolCalls : null,
                    usedTools: usedToolNames.size > 0 ? [...usedToolNames] : null,
                })
                .where(eq(models.agentMessage.id, idAgentMessage))
        } else {
            // Persist the completed assistant message with token usage
            await db
                .update(models.agentMessage)
                .set({
                    state: "completed",
                    output: accumulatedContent || null,
                    toolCalls: accumulatedToolCalls.length > 0 ? accumulatedToolCalls : null,
                    usedTools: usedToolNames.size > 0 ? [...usedToolNames] : null,
                    inputTokens: capturedInputTokens || null,
                    outputTokens: capturedOutputTokens || null,
                })
                .where(eq(models.agentMessage.id, idAgentMessage))

            // Update session lastUpdatedAt and increment token counters
            if (capturedInputTokens > 0 || capturedOutputTokens > 0) {
                const capturedTotalTokens = capturedInputTokens + capturedOutputTokens
                await db
                    .update(models.agentSession)
                    .set({
                        lastUpdatedAt: new Date().toISOString(),
                        totalInputTokens: sql`${models.agentSession.totalInputTokens} + ${capturedInputTokens}`,
                        totalOutputTokens: sql`${models.agentSession.totalOutputTokens} + ${capturedOutputTokens}`,
                    })
                    .where(eq(models.agentSession.id, agentMessage.idAgentSession))

                // Increment organization-level monthly token usage
                const orgRows = await db
                    .select({
                        tokensTotalLeft: models.organization.tokensTotalLeft,
                        tokensTotalUsed: models.organization.tokensTotalUsed,
                    })
                    .from(models.organization)
                    .where(eq(models.organization.id, idOrganization))
                    .limit(1)
                const org = orgRows.at(0)
                if (org) {
                    await db
                        .update(models.organization)
                        .set({
                            agentTokensCurrentMonthUsage: org.tokensTotalUsed + capturedTotalTokens,
                            tokensTotalLeft: Math.max(org.tokensTotalLeft - capturedTotalTokens, 0),
                            tokensTotalUsed: org.tokensTotalUsed + capturedTotalTokens,
                        })
                        .where(eq(models.organization.id, idOrganization))
                }
            } else {
                await db
                    .update(models.agentSession)
                    .set({ lastUpdatedAt: new Date().toISOString() })
                    .where(eq(models.agentSession.id, agentMessage.idAgentSession))
            }
        }
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error(`[runAgentSession] Error for message ${idAgentMessage}:`, msg)

        await db
            .update(models.agentMessage)
            .set({ state: "error", output: msg })
            .where(eq(models.agentMessage.id, idAgentMessage))
    } finally {
        // Always close the stream so the SSE subscriber terminates
        try {
            await redis.publish(streamKey, `${streamKey}:close`)
        } catch (error: unknown) {
            const publishError = error instanceof Error ? error.message : String(error)
            console.error(`[runAgentSession] Redis close publish failed for message ${idAgentMessage}:`, publishError)
        }
    }
}
