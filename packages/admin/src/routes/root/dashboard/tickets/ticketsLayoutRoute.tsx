import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const ticketsLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/tickets",
    component: () => <Outlet />,
})
