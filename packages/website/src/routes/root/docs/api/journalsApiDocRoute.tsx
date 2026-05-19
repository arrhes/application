import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const journalsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
        description: "Endpoints API pour la gestion des journaux comptables d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/JournalsApiDocPage.tsx"),
        "JournalsApiDocPage",
    ),
})
