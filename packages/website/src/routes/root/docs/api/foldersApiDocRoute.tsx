import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const foldersApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/dossiers",
    beforeLoad: () => ({
        title: "Dossiers",
        description: "Endpoints API pour la gestion des dossiers de fichiers d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/FoldersApiDocPage.tsx"),
        "FoldersApiDocPage",
    ),
})
