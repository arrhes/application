import { createContext, useContext } from "react"

/**
 * Context to share the "active session ID" between the chat area and the sidebar,
 * and to pass a pending first message from AgentNewSessionPage to AgentChat.
 *
 * When a new session is created mid-stream (via the `session-created` custom event),
 * the URL cannot be updated because TanStack Router monkey-patches history.replaceState
 * and would trigger a full route re-evaluation, remounting the chat component and
 * destroying the active SSE stream.
 *
 * Instead, the chat component sets the active session ID via this context, and the
 * sidebar reads it for highlighting purposes.
 */
export const AgentActiveSessionContext = createContext<{
    activeSessionId: string | undefined
    setActiveSessionId: (id: string | undefined) => void
}>({
    activeSessionId: undefined,
    setActiveSessionId: () => {},
})

export function useAgentActiveSession() {
    return useContext(AgentActiveSessionContext)
}

/**
 * Module-level store for passing the first message from AgentNewSessionPage
 * to AgentChat. Using a module-level variable avoids React state timing issues
 * (setState batching means context updates might not propagate before the
 * new route's component mounts after navigation).
 */
let pendingFirstMessage: string | undefined
let pendingYearId: string | undefined

export function setPendingAgentMessage(message: string | undefined, yearId: string | undefined) {
    pendingFirstMessage = message
    pendingYearId = yearId
}

export function consumePendingAgentMessage(): { message: string | undefined; yearId: string | undefined } {
    const message = pendingFirstMessage
    const yearId = pendingYearId
    pendingFirstMessage = undefined
    pendingYearId = undefined
    return { message, yearId }
}
