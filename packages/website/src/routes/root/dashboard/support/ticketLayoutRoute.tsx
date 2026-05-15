import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { supportLayoutRoute } from "./supportLayoutRoute.js"

export const ticketLayoutRoute = createRoute({
    getParentRoute: () => supportLayoutRoute,
    path: "/tickets/$idTicket",
    beforeLoad: () => ({
        title: "Ticket",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/support/$idTicket/TicketLayout.js"),
        "TicketLayout",
    ),
})
