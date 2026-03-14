import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const rootDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/rootDashboardDocPage.tsx"),
        "RootDashboardDocPage",
    ),
})
