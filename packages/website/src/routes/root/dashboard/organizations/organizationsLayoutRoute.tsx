import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const organizationsLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <Outlet />,
})
