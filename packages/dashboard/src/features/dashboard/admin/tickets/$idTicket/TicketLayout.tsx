import { adminReadOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { LinkButton } from "../../../../../components/LinkButton.js"

import { useDataFromAPI } from "../../../../../utilities/useHTTPData.js"
import { StatusToggle } from "./StatusToggle.js"

export function TicketLayout() {
    const params = useParams({
        strict: false,
    }) as {
        idTicket: string
    }

    const ticket = useDataFromAPI({
        routeDefinition: adminReadOneTicketRouteDefinition,
        body: {
            idTicket: params.idTicket,
        },
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
                <span
                    className={css({
                        fontSize: "sm",
                        color: "danger",
                    })}
                >
                    Erreur lors de la recuperation du ticket.
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
                    <LinkButton to="/dashboard/admin/tickets">
                        <ButtonGhostContent
                            leftIcon={<IconArrowLeft />}
                            text="Retour aux tickets"
                        />
                    </LinkButton>
                    <StatusToggle
                        idTicket={params.idTicket}
                        currentStatus={ticket.data.status}
                    />
                </div>
            )}

            <Outlet />
        </div>
    )
}
