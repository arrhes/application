import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const filesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/filesDashboardDocPage.js"),
        "FilesDashboardDocPage",
    ),
})
