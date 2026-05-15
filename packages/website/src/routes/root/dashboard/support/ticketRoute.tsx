import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { ticketLayoutRoute } from "./ticketLayoutRoute.js"

export const ticketRoute = createRoute({
    getParentRoute: () => ticketLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/support/$idTicket/TicketPage.js"),
        "TicketPage",
    ),
})
