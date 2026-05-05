import {
    adminReadAllTicketMessagesRouteDefinition,
    adminReadOneTicketRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Badge, CircularLoader, formatDate, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCheck } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { $idTicketLayoutRoute } from "../../../../routes/root/dashboard/tickets/$idTicket/$idTicketLayoutRoute.js"
import { useDataFromAPI } from "../../../../utilities/useDataFromAPI.js"
import { CreateOneTicketMessage } from "./createOneTicketMessage.js"
import { TicketMessageList } from "./ticketMessageList.js"

const statusLabels: Record<string, string> = {
    open: "Ouvert",
    closed: "Fermé",
}

const categoryLabels: Record<string, string> = {
    bug: "Erreur",
    enhancement: "Amélioration",
    feature: "Fonctionnalité",
    other: "Autre",
}

export function TicketPage() {
    const params = useParams({ from: $idTicketLayoutRoute.id })

    const ticket = useDataFromAPI({
        routeDefinition: adminReadOneTicketRouteDefinition,
        body: { idTicket: params.idTicket },
    })

    const messages = useDataFromAPI({
        routeDefinition: adminReadAllTicketMessagesRouteDefinition,
        body: { idTicket: params.idTicket },
    })

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" })}>
            {/* Ticket info card */}
            {ticket.isPending && <CircularLoader text="Chargement du ticket..." />}

            {ticket.isError && (
                <span className={css({ fontSize: "sm", color: "danger" })}>
                    Erreur lors de la récupération du ticket.
                </span>
            )}

            {ticket.data && (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        borderRadius: "lg",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "1rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <h1 className={css({ fontSize: "lg", color: "neutral" })}>Ticket</h1>
                            <span className={css({ fontSize: "lg", color: "neutral/50" })}>{ticket.data.id}</span>
                        </div>
                        <Badge>{statusLabels[ticket.data.status] ?? ticket.data.status}</Badge>
                    </div>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <span className={css({ fontSize: "sm", color: "neutral/50" })}>Catégorie : </span>
                        <span className={css({ fontSize: "sm", color: "neutral" })}>
                            {categoryLabels[ticket.data.category] ?? ticket.data.category}
                        </span>
                    </div>

                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                        {`Utilisateur : ${ticket.data.idUser}`}
                    </span>

                    {/* Dates */}
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                        {`Créé le ${formatDate(ticket.data.createdAt, { includeTime: true })}`}
                    </span>

                    {ticket.data.lastUpdatedAt ? (
                        <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                            {`Mis à jour le ${formatDate(ticket.data.lastUpdatedAt, { includeTime: true })}`}
                        </span>
                    ) : null}

                    <Separator />

                    {/* Last message info */}
                    {messages.data &&
                        (() => {
                            const sorted = [...messages.data].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                            const lastMessage = sorted[0]

                            return (
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "1rem",
                                        flexWrap: "wrap",
                                    })}
                                >
                                    {lastMessage ? (
                                        <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                                            {lastMessage.idAdminUser !== null
                                                ? "Dernier message : Admin (en attente de réponse utilisateur)"
                                                : "Dernier message : Utilisateur (en attente de votre réponse)"}
                                        </span>
                                    ) : (
                                        <span className={css({ fontSize: "sm", color: "neutral/50" })}>
                                            Aucun message
                                        </span>
                                    )}
                                </div>
                            )
                        })()}
                </div>
            )}

            {/* Reply form — only when open */}
            {ticket.data &&
                (ticket.data.status === "open" ? (
                    <CreateOneTicketMessage idTicket={params.idTicket} />
                ) : (
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem",
                            borderRadius: "md",
                            backgroundColor: "neutral/5",
                            border: "1px solid",
                            borderColor: "neutral/10",
                        })}
                    >
                        <IconCheck size={16} className={css({ color: "neutral/50" })} />
                        <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                            Ce ticket est fermé. Rouvrez-le pour répondre.
                        </span>
                    </div>
                ))}

            {/* Messages */}
            <TicketMessageList idTicket={params.idTicket} />
        </div>
    )
}
