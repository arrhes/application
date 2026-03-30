import {
    adminCreateOneTicketMessageRouteDefinition,
    adminReadAllTicketMessagesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonPlainContent, InputTextArea } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSend } from "@tabler/icons-react"
import { useState } from "react"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function CreateOneTicketMessage(props: { idTicket: string }) {
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
