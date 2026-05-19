import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const apiKeysApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/clés-api",
    beforeLoad: () => ({
        title: "Clés API",
        description: "Endpoints API pour la gestion des clés d'accès programmatique à l'API Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/ApiKeysApiDocPage.tsx"),
        "ApiKeysApiDocPage",
    ),
})
