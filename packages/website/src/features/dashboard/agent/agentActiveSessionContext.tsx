import { createContext, useContext } from "react"

/**
 * Context to share the "active session ID" between the chat area and the sidebar.
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
