import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const filesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Fichiers et documents",
        description:
            "Endpoints API pour la gestion des fichiers et documents : upload, téléchargement et association aux écritures.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/FilesApiDocPage.tsx"), "FilesApiDocPage"),
})
