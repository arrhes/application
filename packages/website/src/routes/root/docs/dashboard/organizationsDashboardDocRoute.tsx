import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const organizationsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description:
            "Gérez vos organisations dans Arrhes : création, paramétrage, gestion des membres et des abonnements.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/organizationsDashboardDocPage.js"),
        "OrganizationsDashboardDocPage",
    ),
})
