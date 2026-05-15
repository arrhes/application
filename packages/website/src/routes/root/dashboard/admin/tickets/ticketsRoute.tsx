import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { adminTicketsLayoutRoute } from "./ticketsLayoutRoute.js"

export const adminTicketsRoute = createRoute({
    getParentRoute: () => adminTicketsLayoutRoute,
    path: "/",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => ({
        title: "Tickets",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/dashboard/admin/tickets/TicketsPage.js"),
        "TicketsPage",
    ),
})
