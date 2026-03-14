import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const gettingStartedDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/démarrage",
    beforeLoad: () => ({
        title: "Démarrage",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/gettingStartedDashboardDocPage.tsx"),
        "GettingStartedDashboardDocPage",
    ),
})
