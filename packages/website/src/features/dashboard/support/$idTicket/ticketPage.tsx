import { readAllTicketMessagesRouteDefinition, readOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { Chip, formatDate, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { Banner } from "../../../../components/layouts/banner.tsx"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../components/layouts/section/section.tsx"
import { CreateOneTicketMessage } from "./createOneTicketMessage.tsx"
import { TicketMessageList } from "./ticketMessageList.tsx"

const categoryLabels: Record<string, string> = {
    bug: "Erreur",
    enhancement: "Amélioration",
    feature: "Fonctionnalité",
    other: "Autre",
}

const statusLabels: Record<
    string,
    {
        text: string
        color: "success" | "neutral"
    }
> = {
    open: {
        text: "Ouvert",
        color: "success",
    },
    closed: {
        text: "Fermé",
        color: "neutral",
    },
}

export function TicketPage(props: { idTicket?: string } = {}) {
    const params = useParams({
        strict: false,
    })
    const idTicket = props.idTicket ?? params.idTicket ?? ""

    return (
        <Section.Item
            className={css({
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <DataWrapper
                routeDefinition={readOneTicketRouteDefinition}
                body={{
                    idTicket: idTicket,
                }}
            >
                {(ticket) => {
                    const status = statusLabels[ticket.status] ?? {
                        text: ticket.status,
                        color: "neutral",
                    }
                    const categoryLabel = categoryLabels[ticket.category] ?? ticket.category

                    return (
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
                                    <h1
                                        className={css({
                                            fontSize: "lg",
                                            color: "neutral",
                                        })}
                                    >
                                        Ticket
                                    </h1>
                                    <span
                                        className={css({
                                            fontSize: "lg",
                                            color: "neutral/50",
                                        })}
                                    >
                                        {ticket.id}
                                    </span>
                                </div>
                                <Chip
                                    text={status.text}
                                    color={status.color}
                                />
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
                                <span
                                    className={css({
                                        fontSize: "sm",
                                        color: "neutral/50",
                                    })}
                                >
                                    Catégorie :{" "}
                                </span>
                                <span
                                    className={css({
                                        fontSize: "sm",
                                        color: "neutral",
                                    })}
                                >
                                    {categoryLabel}
                                </span>
                            </div>

                            {/* Dates */}
                            <span
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
                            >
                                {`Créé le ${formatDate(ticket.createdAt, {
                                    includeTime: true,
                                })}`}
                            </span>

                            {ticket.lastUpdatedAt ? (
                                <span
                                    className={css({
                                        fontSize: "xs",
                                        color: "neutral/50",
                                    })}
                                >
                                    {`Mis à jour le ${formatDate(ticket.lastUpdatedAt, {
                                        includeTime: true,
                                    })}`}
                                </span>
                            ) : null}

                            <Separator />

                            {/* Last message info + close/reopen */}
                            <DataWrapper
                                routeDefinition={readAllTicketMessagesRouteDefinition}
                                body={{
                                    idTicket: idTicket,
                                }}
                            >
                                {(messages) => {
                                    const sorted = [
                                        ...messages,
                                    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: "neutral/60",
                                                    })}
                                                >
                                                    {lastMessage.idAdminUser !== null
                                                        ? "Dernier message : Support (en attente de votre réponse)"
                                                        : "Dernier message : Vous (en attente d'une réponse)"}
                                                </span>
                                            ) : (
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: "neutral/50",
                                                    })}
                                                >
                                                    Aucun message
                                                </span>
                                            )}
                                        </div>
                                    )
                                }}
                            </DataWrapper>
                        </div>
                    )
                }}
            </DataWrapper>

            {/* Reply form — only when open */}
            <DataWrapper
                routeDefinition={readOneTicketRouteDefinition}
                body={{
                    idTicket: idTicket,
                }}
            >
                {(ticket) =>
                    ticket.status === "open" ? (
                        <CreateOneTicketMessage idTicket={idTicket} />
                    ) : (
                        <Banner
                            variant="error"
                            title="Ticket fermé"
                        >
                            Ce ticket est fermé. Ouvrez-le de nouveau pour envoyer un message.
                        </Banner>
                    )
                }
            </DataWrapper>

            {/* Messages */}
            <DataWrapper
                routeDefinition={readAllTicketMessagesRouteDefinition}
                body={{
                    idTicket: idTicket,
                }}
            >
                {(messages) => <TicketMessageList messages={messages} />}
            </DataWrapper>
        </Section.Item>
    )
}
