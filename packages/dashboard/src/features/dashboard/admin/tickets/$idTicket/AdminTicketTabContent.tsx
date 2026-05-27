import { adminReadOneTicketRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.js"
import { StatusToggle } from "./StatusToggle.js"
import { TicketPage } from "./TicketPage.js"

export function AdminTicketTabContent(props: { idTicket: string }) {
    const ticket = useDataFromAPI({
        routeDefinition: adminReadOneTicketRouteDefinition,
        body: {
            idTicket: props.idTicket,
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
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <StatusToggle
                        idTicket={props.idTicket}
                        currentStatus={ticket.data.status}
                    />
                </div>
            )}

            <TicketPage idTicket={props.idTicket} />
        </div>
    )
}
