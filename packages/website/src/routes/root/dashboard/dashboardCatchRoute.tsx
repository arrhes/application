import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

export const dashboardCatchRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "$",
    beforeLoad: () => ({
        title: "Page introuvable",
    }),
    component: lazyRouteComponent(
        () => import("../../../features/dashboard/DashboardNotFoundPage.js"),
        "DashboardNotFoundPage",
    ),
})
