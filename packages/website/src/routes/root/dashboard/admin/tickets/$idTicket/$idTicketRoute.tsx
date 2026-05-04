import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { $idTicketLayoutRoute } from "./$idTicketLayoutRoute.js"

export const $idTicketRoute = createRoute({
    getParentRoute: () => $idTicketLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/dashboard/admin/tickets/$idTicket/ticketPage.js"),
        "TicketPage",
    ),
})
