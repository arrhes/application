import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { ticketsLayoutRoute } from "./ticketsLayoutRoute.js"

export const ticketsRoute = createRoute({
    getParentRoute: () => ticketsLayoutRoute,
    path: "/",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Tickets",
    }),
    component: lazyRouteComponent(() => import("../../../../features/dashboard/tickets/ticketsPage.js"), "TicketsPage"),
})
