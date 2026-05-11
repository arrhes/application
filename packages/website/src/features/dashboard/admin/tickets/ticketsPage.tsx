import { adminReadAllTicketsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Badge, CircularLoader, formatDate } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconExternalLink } from "@tabler/icons-react"
import type * as v from "valibot"
import { LinkButton } from "../../../../components/linkButton.js"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.js"

const statusLabels: Record<string, string> = {
    open: "Ouvert",
    closed: "Ferme",
}

const categoryLabels: Record<string, string> = {
    bug: "Bug",
    enhancement: "Amelioration",
    feature: "Fonctionnalite",
    other: "Autre",
}

type Ticket = v.InferOutput<(typeof adminReadAllTicketsRouteDefinition)["schemas"]["return"]>[number]

function TicketRow(props: { ticket: Ticket }) {
    const { ticket } = props
    return (
        <LinkButton
            to="/dashboard/admin/tickets/$idTicket"
            params={{
                idTicket: ticket.id,
            }}
            className={css({
                width: "100%",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                    cursor: "pointer",
                    _hover: {
                        backgroundColor: "neutral/3",
                    },
                    transition: "background-color 0.15s ease",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                        minWidth: 0,
                        flex: 1,
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "sm",
                                fontWeight: "medium",
                                color: "neutral",
                            })}
                        >
                            {ticket.id}
                        </span>
                        <Badge>{statusLabels[ticket.status] ?? ticket.status}</Badge>
                        <Badge>{categoryLabels[ticket.category] ?? ticket.category}</Badge>
                    </div>
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/50",
                        })}
                    >
                        {`Cree le ${formatDate(ticket.createdAt, {
                            includeTime: true,
                        })}`}
                        {ticket.lastUpdatedAt
                            ? ` - Mis a jour le ${formatDate(ticket.lastUpdatedAt, {
                                  includeTime: true,
                              })}`
                            : ""}
                    </span>
                </div>
                <IconExternalLink
                    size={16}
                    className={css({
                        color: "neutral/40",
                        flexShrink: 0,
                    })}
                />
            </div>
        </LinkButton>
    )
}

export function TicketsPage() {
    const tickets = useDataFromAPI({
        routeDefinition: adminReadAllTicketsRouteDefinition,
        body: {},
    })

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <h1
                className={css({
                    fontSize: "lg",
                    fontWeight: "bold",
                    color: "neutral",
                })}
            >
                Tickets
            </h1>

            {tickets.isPending && <CircularLoader text="Chargement des tickets..." />}

            {tickets.isError && (
                <div
                    className={css({
                        padding: "1rem",
                        borderRadius: "md",
                        backgroundColor: "danger/5",
                        border: "1px solid",
                        borderColor: "danger/20",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "sm",
                            color: "danger",
                        })}
                    >
                        Erreur lors de la recuperation des tickets.
                    </span>
                </div>
            )}

            {tickets.data && tickets.data.length === 0 && (
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral/50",
                        padding: "1rem",
                    })}
                >
                    Aucun ticket pour le moment.
                </span>
            )}

            {tickets.data && tickets.data.length > 0 && (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {[
                        ...tickets.data,
                    ]
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .map((ticket) => (
                            <TicketRow
                                key={ticket.id}
                                ticket={ticket}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}
