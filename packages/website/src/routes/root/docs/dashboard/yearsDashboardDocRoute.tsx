import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const yearsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/yearsDashboardDocPage.js"),
        "YearsDashboardDocPage",
    ),
})
