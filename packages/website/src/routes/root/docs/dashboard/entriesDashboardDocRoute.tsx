import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const entriesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
        description:
            "Saisissez et gérez vos écritures comptables dans Arrhes : création, modification, suppression et recherche d'écritures.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/EntriesDashboardDocPage.js"),
        "EntriesDashboardDocPage",
    ),
})
