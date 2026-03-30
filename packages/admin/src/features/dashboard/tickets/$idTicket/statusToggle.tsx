import {
    adminReadOneTicketRouteDefinition,
    adminUpdateOneTicketStatusRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { IconLock, IconLockOpen } from "@tabler/icons-react"
import { useState } from "react"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function StatusToggle(props: { idTicket: string; currentStatus: string }) {
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
                    leftIcon={<IconLock size={16} />}
                    text={isUpdating ? "Fermeture..." : "Fermer le ticket"}
                    color="danger"
                />
            ) : (
                <ButtonOutlineContent
                    leftIcon={<IconLockOpen size={16} />}
                    text={isUpdating ? "Ouverture..." : "Rouvrir le ticket"}
                    color="success"
                />
            )}
        </Button>
    )
}
