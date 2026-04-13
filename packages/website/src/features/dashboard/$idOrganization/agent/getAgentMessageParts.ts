import type { InferOutput } from "valibot"
import type { readAllAgentMessagesRouteDefinition } from "../../../../../../metadata/build/routes/dashboard/auth/index.js"
import { reconstructToolCallParts } from "./reconstructToolCallParts.js"

type Part = {
    type: string
    content: string | null
    id?: string
    name?: string
    state?: string
    args?: unknown
}

/**
 * Convert server-stored messages into renderable parts, interleaving text and
 * tool-call parts based on the order recorded in the toolCalls events array.
 */
export function getAgentMessageParts(
    agentMessage: InferOutput<typeof readAllAgentMessagesRouteDefinition.schemas.return>[number],
) {
    const content = agentMessage.content ?? ""
    const events: unknown[] = Array.isArray(agentMessage.toolCalls) ? agentMessage.toolCalls : []

    // Check if we have interleaving markers
    const hasTextMarkers = events.some(
        (e) =>
            typeof e === "object" &&
            e !== null &&
            ((e as any).type === "TEXT_BOUNDARY" || (e as any).type === "TEXT_MESSAGE_END"),
    )

    if (hasTextMarkers) {
        return buildInterleavedParts(events, content, agentMessage.state)
    }

    // Legacy fallback: all tool calls first, then text
    return buildLegacyParts(agentMessage)
}

function buildInterleavedParts(events: unknown[], content: string, state: string | null): Part[] {
    const parts: Part[] = []
    let textOffset = 0
    const toolCallMap = new Map<string, { name: string; args: unknown; ended: boolean }>()

    const seenToolCallEnds = new Set<string>()

    // Walk events in the order they were recorded
    for (const event of events) {
        if (typeof event !== "object" || event === null) continue
        const e = event as Record<string, unknown>

        if (e.type === "TEXT_BOUNDARY" || e.type === "TEXT_MESSAGE_END") {
            const endPos = typeof e.contentLength === "number" ? e.contentLength : content.length
            const segment = content.slice(textOffset, endPos)
            if (segment) {
                parts.push({ type: "text", content: segment })
            }
            textOffset = endPos
        }

        if (e.type === "TOOL_CALL_START" && typeof e.toolCallId === "string" && typeof e.toolName === "string") {
            if (!toolCallMap.has(e.toolCallId)) {
                toolCallMap.set(e.toolCallId, { name: e.toolName, args: undefined, ended: false })
            }
        }

        if (e.type === "TOOL_CALL_END" && typeof e.toolCallId === "string" && typeof e.toolName === "string") {
            // Deduplicate: framework may re-emit TOOL_CALL_END after RUN_FINISHED
            if (seenToolCallEnds.has(e.toolCallId)) continue
            seenToolCallEnds.add(e.toolCallId)

            const existing = toolCallMap.get(e.toolCallId)
            if (existing) {
                existing.args = e.input
                existing.ended = true
            } else {
                toolCallMap.set(e.toolCallId, { name: e.toolName, args: e.input, ended: true })
            }
            // Emit tool-call part after TOOL_CALL_END
            const tc = toolCallMap.get(e.toolCallId)!
            parts.push({
                type: "tool-call",
                id: e.toolCallId,
                name: tc.name,
                content: null,
                state: tc.ended ? "result" : "awaiting-input",
                args: tc.args,
            })
        }
    }

    // Remaining text after the last TEXT_MESSAGE_END (e.g. during streaming)
    if (textOffset < content.length) {
        const remaining = content.slice(textOffset)
        // If the message errored and this is the only text, it's the error message
        if (state === "error" && parts.every((p) => p.type !== "text")) {
            parts.push({ type: "error", content: remaining })
        } else {
            parts.push({ type: "text", content: remaining })
        }
    }

    // If no parts were generated, show appropriate fallback
    if (parts.length === 0) {
        if (state === "error") {
            parts.push({
                type: "error",
                content: content || "Une erreur est survenue lors de la génération de la réponse.",
            })
        } else {
            parts.push({ type: "text", content: getContentFallback(content, state) })
        }
    }

    return parts
}

function buildLegacyParts(agentMessage: { content: string | null; state: string | null; toolCalls: unknown }): Part[] {
    const parts: Part[] = []

    const toolCallParts = reconstructToolCallParts(agentMessage.toolCalls)
    parts.push(...toolCallParts)

    const text = getContentFallback(agentMessage.content ?? "", agentMessage.state)
    if (agentMessage.state === "error") {
        parts.push({ type: "error", content: text || "Une erreur est survenue lors de la génération de la réponse." })
    } else {
        parts.push({ type: "text", content: text })
    }

    return parts
}

function getContentFallback(content: string, state: string | null): string | null {
    if (state === "streaming" && !content) {
        return "..."
    }
    return content || null
}
