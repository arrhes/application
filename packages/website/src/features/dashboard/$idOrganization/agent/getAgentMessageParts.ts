import { InferOutput } from "valibot"
import { readAllAgentMessagesRouteDefinition } from "../../../../../../metadata/build/routes/dashboard/auth/index.js"
import { reconstructToolCallParts } from "./reconstructToolCallParts.js"

/**
 * Convert server-stored messages (flat role+content) into TanStack AI UIMessage format.
 * Reconstructs tool-call parts from stored toolCalls AG-UI events and places them
 * before the text content part.
 */
export function getAgentMessageParts(
    agentMessage: (InferOutput<typeof readAllAgentMessagesRouteDefinition.schemas.return>)[number],
) {
    const parts: Array<{
        type: string
        content: string | null
        id?: string
        name?: string
        state?: string
        args?: unknown
    }> = []

    // Reconstruct tool-call parts from stored AG-UI events (before text content)                    
    const toolCallParts = reconstructToolCallParts(agentMessage.toolCalls)
    parts.push(...toolCallParts)

    // For errored messages with no content, show an error indicator
    if (agentMessage.state === "error") {
        if (agentMessage.content === null) {
            parts.push({
                type: "text",
                content: "Une erreur est survenue lors de la génération de la réponse.",
            })
        }
        else {
            parts.push({ type: "text", content: agentMessage.content })
        }
    }

    if (agentMessage.state === "completed") {
        parts.push({ type: "text", content: agentMessage.content })
    }

    if (agentMessage.state === "streaming") {
        if (agentMessage.content === null) {
            parts.push({
                type: "text",
                content: "...",
            })
        }
        else {
            parts.push({ type: "text", content: agentMessage.content })
        }
    }

    return parts
}
