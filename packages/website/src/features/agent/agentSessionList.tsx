import { deleteOneAgentSessionRouteDefinition, readAllAgentSessionsRouteDefinition } from "@arrhes/application-metadata"
import { formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useAgentActiveSession } from "../dashboard/agent/agentActiveSessionContext.tsx"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"

export function AgentSessionList(props: { idOrganization: string }) {
    const navigate = useNavigate()
    const params = useParams({ strict: false }) as { idAgentSession?: string }
    const { activeSessionId, setActiveSessionId } = useAgentActiveSession()

    // Use the context's activeSessionId (set by chat on session-created) if available,
    // otherwise fall back to the URL param (set by TanStack Router on navigation)
    const currentSessionId = activeSessionId ?? params.idAgentSession

    const { data: sessions } = useDataFromAPI({
        routeDefinition: readAllAgentSessionsRouteDefinition,
        body: {
            idOrganization: props.idOrganization,
        },
    })

    function handleNewSession() {
        setActiveSessionId(undefined)
        navigate({
            to: "/dashboard/agent/$idOrganization",
            params: { idOrganization: props.idOrganization },
        })
    }

    function handleSelectSession(idAgentSession: string) {
        setActiveSessionId(undefined)
        navigate({
            to: "/dashboard/agent/$idOrganization/$idAgentSession",
            params: { idOrganization: props.idOrganization, idAgentSession },
        })
    }

    async function handleDelete(idAgentSession: string) {
        await getResponseBodyFromAPI({
            routeDefinition: deleteOneAgentSessionRouteDefinition,
            body: { idAgentSession },
        })
        await invalidateData({
            routeDefinition: readAllAgentSessionsRouteDefinition,
            body: {
                idOrganization: props.idOrganization,
            },
        })
        // If the deleted session was the current one, navigate to new session
        if (idAgentSession === currentSessionId) {
            handleNewSession()
        }
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
            <button
                type="button"
                onClick={handleNewSession}
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem",
                    borderRadius: "sm",
                    border: "1px dashed",
                    borderColor: "neutral/20",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontSize: "sm",
                    color: "neutral/60",
                    width: "100%",
                    _hover: {
                        backgroundColor: "neutral/5",
                        borderColor: "neutral/30",
                    },
                })}
            >
                <IconPlus size={14} />
                Nouvelle conversation
            </button>

            {sessions?.map((session) => (
                <div
                    key={session.id}
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.375rem 0.5rem",
                        borderRadius: "sm",
                        cursor: "pointer",
                        fontSize: "sm",
                        backgroundColor: session.id === currentSessionId ? "neutral/10" : "transparent",
                        _hover: {
                            backgroundColor: "neutral/5",
                        },
                    })}
                >
                    <button
                        type="button"
                        onClick={() => handleSelectSession(session.id)}
                        className={css({
                            flex: 1,
                            textAlign: "left",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "neutral",
                            fontSize: "sm",
                            padding: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        })}
                    >
                        {session.title ?? formatDateTime(session.createdAt)}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(session.id)
                        }}
                        className={css({
                            flexShrink: 0,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "neutral/30",
                            padding: "0.125rem",
                            borderRadius: "xs",
                            _hover: {
                                color: "error",
                                backgroundColor: "error/10",
                            },
                        })}
                    >
                        <IconTrash size={14} />
                    </button>
                </div>
            ))}
        </div>
    )
}
