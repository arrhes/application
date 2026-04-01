import { createRoute, Outlet } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "../dashboard/dashboardDocLayoutRoute.js"

export const aiDocLayoutRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/assistant",
    component: () => <Outlet />,
})
