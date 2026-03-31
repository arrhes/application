import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const agentLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: "Assistant",
    }),
    component: () => <Outlet />,
})
