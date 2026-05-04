import { adminReadAllTicketMessagesRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader, formatDate } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.js"

type TicketMessage = v.InferOutput<(typeof adminReadAllTicketMessagesRouteDefinition)["schemas"]["return"]>[number]

function MessageBubble(props: { currentUserId: string | undefined; message: TicketMessage }) {
    const { currentUserId, message } = props
    const isAdmin = message.idAdminUser !== null || message.idUser === currentUserId

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                justifyContent: isAdmin ? "flex-end" : "flex-start",
            })}
        >
            <div
                className={css({
                    maxWidth: "80%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    padding: "0.75rem",
                    borderRadius: "md",
                    backgroundColor: isAdmin ? "primary/5" : "neutral/2",
                })}
            >
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
                    <span
                        className={css({
                            fontSize: "xs",
                            fontWeight: "medium",
                            color: isAdmin ? "primary" : "neutral/60",
                        })}
                    >
                        {isAdmin ? "Admin" : "Utilisateur"}
                    </span>
                    <span className={css({ fontSize: "xs", color: "neutral/40" })}>
                        {`Le ${formatDate(message.createdAt, { includeTime: true })}`}
                    </span>
                </div>
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral",
                        whiteSpace: "pre-wrap",
                    })}
                >
                    {message.message}
                </span>
            </div>
        </div>
    )
}

export function TicketMessageList(props: { currentUserId: string | undefined; idTicket: string }) {
    const messages = useDataFromAPI({
        routeDefinition: adminReadAllTicketMessagesRouteDefinition,
        body: { idTicket: props.idTicket },
    })

    if (messages.isPending) {
        return <CircularLoader text="Chargement des messages..." />
    }

    if (messages.isError) {
        return (
            <span className={css({ fontSize: "sm", color: "danger", padding: "1rem" })}>
                Erreur lors de la recuperation des messages.
            </span>
        )
    }

    if (!messages.data || messages.data.length === 0) {
        return (
            <span className={css({ fontSize: "sm", color: "neutral/50", padding: "1rem" })}>
                Aucun message pour le moment.
            </span>
        )
    }

    const sortedMessages = [...messages.data].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                border: "1px solid",
                borderColor: "neutral/10",
                borderRadius: "lg",
                padding: "1rem",
            })}
        >
            {sortedMessages.map((message) => (
                <MessageBubble key={message.id} currentUserId={props.currentUserId} message={message} />
            ))}
        </div>
    )
}
