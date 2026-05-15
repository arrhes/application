import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const gettingStartedDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/démarrage",
    beforeLoad: () => ({
        title: "Démarrage",
        description:
            "Guide de démarrage rapide d'Arrhes : créez votre compte, configurez votre première organisation et commencez votre comptabilité.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/GettingStartedDashboardDocPage.tsx"),
        "GettingStartedDashboardDocPage",
    ),
})
