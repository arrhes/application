import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const supportLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
    }),
    component: () => <Outlet />,
})
