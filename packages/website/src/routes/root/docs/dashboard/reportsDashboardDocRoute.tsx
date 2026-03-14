import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const reportsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents de synthèse",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/reportsDashboardDocPage.tsx"),
        "ReportsDashboardDocPage",
    ),
})
