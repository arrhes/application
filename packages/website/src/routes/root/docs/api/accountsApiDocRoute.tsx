import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const accountsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description: "Endpoints API pour la gestion du plan comptable d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/AccountsApiDocPage.tsx"),
        "AccountsApiDocPage",
    ),
})
