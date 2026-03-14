import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const authenticationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification et utilisateurs",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/authenticationApiDocPage.tsx"),
        "AuthenticationApiDocPage",
    ),
})
