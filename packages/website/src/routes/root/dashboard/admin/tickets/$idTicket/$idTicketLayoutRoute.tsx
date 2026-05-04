import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { adminTicketsLayoutRoute } from "../ticketsLayoutRoute.js"

export const $idTicketLayoutRoute = createRoute({
    getParentRoute: () => adminTicketsLayoutRoute,
    path: "/$idTicket",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Ticket",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/dashboard/admin/tickets/$idTicket/ticketLayout.js"),
        "TicketLayout",
    ),
})
