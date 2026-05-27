/**
 * Reconstruct tool-call UIMessage parts from the stored AG-UI events array.
 * Groups TOOL_CALL_START/TOOL_CALL_END events by toolCallId and returns
 * one { type: "tool-call", id, name, state: "result", args } per unique tool call.
 */
export function reconstructToolCallParts(toolCalls: unknown): Array<{
    type: "tool-call"
    id: string
    content: null
    name: string
    state: string
    args: unknown
}> {
    if (!Array.isArray(toolCalls) || toolCalls.length === 0) return []

    const toolCallMap = new Map<
        string,
        {
            name: string
            args: unknown
            ended: boolean
        }
    >()

    for (const event of toolCalls) {
        if (typeof event !== "object" || event === null) continue
        const e = event as {
            type?: string
            toolCallId?: string
            toolName?: string
            input?: unknown
        }
        if (!e.toolCallId || !e.toolName) continue

        if (e.type === "TOOL_CALL_START" && !toolCallMap.has(e.toolCallId)) {
            toolCallMap.set(e.toolCallId, {
                name: e.toolName,
                args: undefined,
                ended: false,
            })
        }
        // TOOL_CALL_END with "input" carries the tool arguments
        if (e.type === "TOOL_CALL_END" && e.input !== undefined) {
            const existing = toolCallMap.get(e.toolCallId)
            if (existing) {
                existing.args = e.input
                existing.ended = true
            } else {
                toolCallMap.set(e.toolCallId, {
                    name: e.toolName,
                    args: e.input,
                    ended: true,
                })
            }
        }
    }

    return Array.from(toolCallMap.entries()).map(([id, { name, args, ended }]) => ({
        type: "tool-call" as const,
        id,
        name,
        content: null,
        state: ended ? "result" : "awaiting-input",
        args,
    }))
}
