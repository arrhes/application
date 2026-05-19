import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const entryLinesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/lignes",
    beforeLoad: () => ({
        title: "Lignes d'écriture",
        description: "Endpoints API pour la gestion des lignes de débit/crédit et des tags des écritures Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/EntryLinesApiDocPage.tsx"),
        "EntryLinesApiDocPage",
    ),
})
