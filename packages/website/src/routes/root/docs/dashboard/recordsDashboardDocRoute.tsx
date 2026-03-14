import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const recordsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/recordsDashboardDocPage.js"),
        "RecordsDashboardDocPage",
    ),
})
