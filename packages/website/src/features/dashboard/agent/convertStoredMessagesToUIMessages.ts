import { reconstructToolCallParts } from "./reconstructToolCallParts.js"

/**
 * Convert server-stored messages (flat role+content) into TanStack AI UIMessage format.
 * Reconstructs tool-call parts from stored toolCalls AG-UI events and places them
 * before the text content part.
 */
export function convertStoredMessagesToUIMessages(
    storedMessages: Array<{
        id: string
        role: string
        content: string | null
        toolCalls: unknown
        toolResults: unknown
        state: string
        createdAt: string
    }>,
): Array<{
    id: string
    role: "user" | "assistant" | "system"
    createdAt: Date
    parts: Array<{ type: string; content?: string; id?: string; name?: string; state?: string; args?: unknown }>
}> {
    return (
        storedMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => {
                const parts: Array<{
                    type: string
                    content?: string
                    id?: string
                    name?: string
                    state?: string
                    args?: unknown
                }> = []

                // Reconstruct tool-call parts from stored AG-UI events (before text content)
                const toolCallParts = reconstructToolCallParts(m.toolCalls)
                parts.push(...toolCallParts)

                // For errored messages with no content, show an error indicator
                if (m.state === "error" && !m.content) {
                    parts.push({
                        type: "text",
                        content: "Une erreur est survenue lors de la génération de la réponse.",
                    })
                } else if (m.state === "error" && m.content) {
                    // Error with content (e.g. rate limit error message from the server)
                    parts.push({ type: "text", content: m.content })
                } else if (m.content) {
                    parts.push({ type: "text", content: m.content })
                }

                return {
                    id: m.id,
                    role: m.role as "user" | "assistant",
                    createdAt: new Date(m.createdAt),
                    parts,
                }
            })
            // Filter out assistant messages with no visible parts (empty content, no tool calls, not an error)
            .filter((m) => m.role === "user" || m.parts.length > 0)
    )
}
