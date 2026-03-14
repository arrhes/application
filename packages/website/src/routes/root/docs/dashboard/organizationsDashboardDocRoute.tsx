import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const organizationsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/organizationsDashboardDocPage.js"),
        "OrganizationsDashboardDocPage",
    ),
})
