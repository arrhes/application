import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { ticketsLayoutRoute } from "../ticketsLayoutRoute.js"

export const $idTicketLayoutRoute = createRoute({
    getParentRoute: () => ticketsLayoutRoute,
    path: "/$idTicket",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Ticket",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/dashboard/tickets/$idTicket/ticketLayout.js"),
        "TicketLayout",
    ),
})
