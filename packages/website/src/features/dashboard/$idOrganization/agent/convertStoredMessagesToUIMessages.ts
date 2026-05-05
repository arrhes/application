import { reconstructToolCallParts } from "./reconstructToolCallParts.js"

/**
 * Convert server-stored messages into TanStack AI UIMessage format.
 * Each stored row represents a user question + assistant response pair.
 * We produce two UIMessages per row (user + assistant) for proper alternation.
 */
export function convertStoredMessagesToUIMessages(
    storedMessages: Array<{
        id: string
        userMessage: string | null
        output: string | null
        toolCalls: unknown
        toolResults: unknown
        state: string
        createdAt: string
    }>,
): Array<{
    id: string
    role: "user" | "assistant" | "system"
    createdAt: Date
    parts: Array<{ type: string; content?: string | null; id?: string; name?: string; state?: string; args?: unknown }>
}> {
    const result: Array<{
        id: string
        role: "user" | "assistant" | "system"
        createdAt: Date
        parts: Array<{
            type: string
            content?: string | null
            id?: string
            name?: string
            state?: string
            args?: unknown
        }>
    }> = []

    for (const m of storedMessages) {
        // User message
        if (m.userMessage) {
            result.push({
                id: `${m.id}-user`,
                role: "user",
                createdAt: new Date(m.createdAt),
                parts: [{ type: "text", content: m.userMessage }],
            })
        }

        // Skip assistant messages still streaming (not finalized)
        if (m.state === "streaming") continue

        // Assistant message
        const parts: Array<{
            type: string
            content?: string | null
            id?: string
            name?: string
            state?: string
            args?: unknown
        }> = []

        // Reconstruct tool-call parts from stored AG-UI events (before text content)
        const toolCallParts = reconstructToolCallParts(m.toolCalls)
        parts.push(...toolCallParts)

        if (m.state === "error" && !m.output) {
            parts.push({
                type: "text",
                content: "Une erreur est survenue lors de la génération de la réponse.",
            })
        } else if (m.output) {
            parts.push({ type: "text", content: m.output })
        }

        // Only add assistant message if it has visible parts
        if (parts.length > 0) {
            result.push({
                id: m.id,
                role: "assistant",
                createdAt: new Date(m.createdAt),
                parts,
            })
        }
    }

    return result
}
