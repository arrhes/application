import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const filesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
        description:
            "Gérez vos pièces justificatives dans Arrhes : importation, association aux écritures et stockage sécurisé de vos documents.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/filesDashboardDocPage.js"),
        "FilesDashboardDocPage",
    ),
})
