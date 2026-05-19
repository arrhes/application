import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const orgUsersApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Endpoints API pour la gestion des membres d'une organisation Arrhes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/OrgUsersApiDocPage.tsx"),
        "OrgUsersApiDocPage",
    ),
})
