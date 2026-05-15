import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const authenticationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification et utilisateurs",
        description:
            "Authentification à l'API Arrhes : gestion des clés API, sessions utilisateurs et sécurité des requêtes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/AuthenticationApiDocPage.tsx"),
        "AuthenticationApiDocPage",
    ),
})
