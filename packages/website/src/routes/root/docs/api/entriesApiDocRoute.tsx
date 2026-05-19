import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const entriesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
        description: "Endpoints API pour la gestion des écritures comptables d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/EntriesApiDocPage.tsx"),
        "EntriesApiDocPage",
    ),
})
