import { adminReadOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { LinkButton } from "../../../../components/linkButton.js"
import { $idTicketLayoutRoute } from "../../../../routes/root/dashboard/tickets/$idTicket/$idTicketLayoutRoute.js"
import { useDataFromAPI } from "../../../../utilities/useDataFromAPI.js"
import { StatusToggle } from "./statusToggle.js"

export function TicketLayout() {
    const params = useParams({ from: $idTicketLayoutRoute.id })

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
                paddingY: "1rem",
            })}
        >
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/dashboard/tickets">
                        <ButtonGhostContent leftIcon={<IconArrowLeft />} text="Retour aux tickets" />
                    </LinkButton>
                    <StatusToggle idTicket={params.idTicket} currentStatus={ticket.data.status} />
                </div>
            )}

            <Outlet />
        </div>
    )
}
