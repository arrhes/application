import { createRoute } from "@tanstack/react-router"
import { DashboardDefaultPage } from "../../../features/dashboard/dashboardDefaultPage.js"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

export const dashboardRootRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/",
    component: DashboardDefaultPage,
})
