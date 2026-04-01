import { readAllAgentSessionsRouteDefinition } from "@arrhes/application-metadata"
import { formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useState } from "react"
import { SearchBar } from "../../../components/layouts/searchBar.tsx"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { useAgentActiveSession } from "./agentActiveSessionContext.tsx"

/**
 * Extract a short snippet around the first occurrence of `query` in `content`.
 * Returns `...before**match**after...` or undefined if not found.
 */
function extractSnippet(content: string, query: string): string | undefined {
    const lowerContent = content.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerContent.indexOf(lowerQuery)
    if (index === -1) return undefined

    const snippetRadius = 30
    const start = Math.max(0, index - snippetRadius)
    const end = Math.min(content.length, index + query.length + snippetRadius)

    let snippet = ""
    if (start > 0) snippet += "..."
    snippet += content.slice(start, end)
    if (end < content.length) snippet += "..."

    return snippet
}

export function AgentSessionList(props: { idOrganization: string }) {
    const navigate = useNavigate()
    const params = useParams({ strict: false }) as { idAgentSession?: string }
    const { activeSessionId, setActiveSessionId } = useAgentActiveSession()
    const [search, setSearch] = useState("")

    // Use the context's activeSessionId (set by chat on session-created) if available,
    // otherwise fall back to the URL param (set by TanStack Router on navigation)
    const currentSessionId = activeSessionId ?? params.idAgentSession

    const searchTrimmed = search.trim()

    const { data: sessions } = useDataFromAPI({
        routeDefinition: readAllAgentSessionsRouteDefinition,
        body: searchTrimmed
            ? { idOrganization: props.idOrganization, search: searchTrimmed }
            : { idOrganization: props.idOrganization },
    })

    const displaySessions = sessions ?? []

    function handleSelectSession(idAgentSession: string) {
        setActiveSessionId(undefined)
        navigate({
            to: "/dashboard/organisations/$idOrganization/agent/$idAgentSession",
            params: { idOrganization: props.idOrganization, idAgentSession },
        })
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                width: "100%",
            })}
        >
            <SearchBar value={search} onChange={setSearch} placeholder="Rechercher une conversation" />

            {displaySessions.map((session) => {
                const snippet =
                    searchTrimmed && session.matchedContent
                        ? extractSnippet(session.matchedContent, searchTrimmed)
                        : undefined

                return (
                    <button
                        key={session.id}
                        type="button"
                        onClick={() => handleSelectSession(session.id)}
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            padding: "0.375rem 0.5rem",
                            borderRadius: "sm",
                            cursor: "pointer",
                            fontSize: "sm",
                            background: "none",
                            border: "none",
                            color: "neutral",
                            textAlign: "left",
                            width: "100%",
                            overflow: "hidden",
                            backgroundColor: session.id === currentSessionId ? "neutral/10" : "transparent",
                            _hover: {
                                backgroundColor: "neutral/5",
                            },
                        })}
                    >
                        <span
                            className={css({
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                            })}
                        >
                            {session.title ?? formatDateTime(session.createdAt)}
                        </span>
                        {session.title && (
                            <span
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/40",
                                    whiteSpace: "nowrap",
                                })}
                            >
                                {formatDateTime(session.createdAt)}
                            </span>
                        )}
                        {snippet && (
                            <span
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/40",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    marginTop: "0.125rem",
                                })}
                            >
                                {snippet}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
