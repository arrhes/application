import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const yearsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
        description:
            "Gérez vos exercices comptables dans Arrhes : création, ouverture, clôture et paramétrage des périodes fiscales.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/YearsDashboardDocPage.js"),
        "YearsDashboardDocPage",
    ),
})
