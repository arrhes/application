import {
    adminCreateOneTicketMessageRouteDefinition,
    adminReadAllTicketMessagesRouteDefinition,
    adminReadOneTicketRouteDefinition,
    adminUpdateOneTicketStatusRouteDefinition,
} from "@arrhes/application-metadata/routes"
import {
    Badge,
    Button,
    ButtonGhostContent,
    ButtonOutlineContent,
    ButtonPlainContent,
    CircularLoader,
    InputTextArea,
    Separator,
} from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconCheck, IconLock, IconLockOpen, IconSend } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import type * as v from "valibot"
import { LinkButton } from "../../../../components/linkButton.js"
import { ticketDetailRoute } from "../../../../routes/root/dashboard/tickets/ticketDetailRoute.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../../../utilities/useDataFromAPI.js"

const statusLabels: Record<string, string> = {
    open: "Ouvert",
    closed: "Fermé",
}

const categoryLabels: Record<string, string> = {
    bug: "Bug",
    enhancement: "Amélioration",
    feature: "Fonctionnalité",
    other: "Autre",
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

type TicketMessage = v.InferOutput<(typeof adminReadAllTicketMessagesRouteDefinition)["schemas"]["return"]>[number]

function MessageBubble(props: { message: TicketMessage }) {
    const { message } = props
    const isAdmin = message.idAdminUser !== null

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
                    border: "1px solid",
                    borderColor: isAdmin ? "primary/20" : "neutral/10",
                    borderRadius: "lg",
                    backgroundColor: isAdmin ? "primary/5" : "white",
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
                        {formatDate(message.createdAt)}
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

function TicketMessages(props: { idTicket: string }) {
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
                Erreur lors de la récupération des messages.
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
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" })}>
            {sortedMessages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}
        </div>
    )
}

function ReplyForm(props: { idTicket: string }) {
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (!message.trim()) return

        setError(undefined)
        setIsSubmitting(true)

        const response = await getResponseBodyFromAPI({
            routeDefinition: adminCreateOneTicketMessageRouteDefinition,
            body: {
                idTicket: props.idTicket,
                message: message.trim(),
            },
        })

        setIsSubmitting(false)

        if (response.ok === false) {
            setError("Impossible d'envoyer le message")
            return
        }

        setMessage("")
        await invalidateData({
            routeDefinition: adminReadAllTicketMessagesRouteDefinition,
            body: { idTicket: props.idTicket },
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}
        >
            <label htmlFor="reply-message" className={css({ fontSize: "sm", fontWeight: "medium", color: "neutral" })}>
                Répondre
            </label>
            <InputTextArea
                id="reply-message"
                value={message}
                onChange={(value) => setMessage(value ?? "")}
                placeholder="Votre réponse..."
            />
            {error && <span className={css({ fontSize: "xs", color: "danger" })}>{error}</span>}
            <div className={css({ display: "flex", justifyContent: "flex-end" })}>
                <Button type="submit" isDisabled={isSubmitting || !message.trim()}>
                    <ButtonPlainContent leftIcon={<IconSend />} text={isSubmitting ? "Envoi..." : "Envoyer"} />
                </Button>
            </div>
        </form>
    )
}

function StatusToggle(props: { idTicket: string; currentStatus: string }) {
    const [isUpdating, setIsUpdating] = useState(false)

    const newStatus = props.currentStatus === "open" ? "closed" : "open"
    const isClosing = props.currentStatus === "open"

    async function handleToggle() {
        setIsUpdating(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: adminUpdateOneTicketStatusRouteDefinition,
            body: {
                idTicket: props.idTicket,
                status: newStatus,
            },
        })
        setIsUpdating(false)

        if (response.ok) {
            await invalidateData({
                routeDefinition: adminReadOneTicketRouteDefinition,
                body: { idTicket: props.idTicket },
            })
        }
    }

    return (
        <Button onClick={handleToggle} isDisabled={isUpdating}>
            {isClosing ? (
                <ButtonOutlineContent
                    leftIcon={<IconLock />}
                    text={isUpdating ? "Fermeture..." : "Fermer le ticket"}
                    color="danger"
                />
            ) : (
                <ButtonOutlineContent
                    leftIcon={<IconLockOpen />}
                    text={isUpdating ? "Ouverture..." : "Rouvrir le ticket"}
                    color="success"
                />
            )}
        </Button>
    )
}

export function TicketDetailPage() {
    const params = useParams({ from: ticketDetailRoute.id })

    const ticket = useDataFromAPI({
        routeDefinition: adminReadOneTicketRouteDefinition,
        body: { idTicket: params.idTicket },
    })

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                padding: "1.5rem 1rem",
            })}
        >
            {/* Back link */}
            <LinkButton to="/dashboard/tickets">
                <ButtonGhostContent leftIcon={<IconArrowLeft />} text="Retour aux tickets" />
            </LinkButton>

            {/* Ticket info */}
            {ticket.isPending && <CircularLoader text="Chargement du ticket..." />}

            {ticket.isError && (
                <span className={css({ fontSize: "sm", color: "danger" })}>
                    Erreur lors de la récupération du ticket.
                </span>
            )}

            {ticket.data && (
                <div className={css({ display: "flex", flexDirection: "column", gap: "1.5rem" })}>
                    {/* Header */}
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            flexWrap: "wrap",
                            gap: "1rem",
                        })}
                    >
                        <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                })}
                            >
                                <h1 className={css({ fontSize: "lg", fontWeight: "bold", color: "neutral" })}>
                                    Ticket
                                </h1>
                                <Badge>{statusLabels[ticket.data.status] ?? ticket.data.status}</Badge>
                                <Badge>{categoryLabels[ticket.data.category] ?? ticket.data.category}</Badge>
                            </div>
                            <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                {`ID: ${ticket.data.id}`}
                            </span>
                            <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                {`Utilisateur: ${ticket.data.idUser}`}
                            </span>
                            <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                {`Créé le ${formatDate(ticket.data.createdAt)}`}
                                {ticket.data.lastUpdatedAt
                                    ? ` · Mis à jour le ${formatDate(ticket.data.lastUpdatedAt)}`
                                    : ""}
                            </span>
                        </div>
                        <StatusToggle idTicket={params.idTicket} currentStatus={ticket.data.status} />
                    </div>

                    <Separator />

                    {/* Reply form */}
                    {ticket.data.status === "open" && <ReplyForm idTicket={params.idTicket} />}

                    {ticket.data.status === "closed" && (
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
                    )}

                    <Separator />

                    {/* Messages */}
                    <TicketMessages idTicket={params.idTicket} />
                </div>
            )}
        </div>
    )
}
