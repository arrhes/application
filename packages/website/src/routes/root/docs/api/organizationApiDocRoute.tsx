import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const organizationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
        description:
            "Endpoints API pour la gestion des organisations Arrhes : création, lecture, mise à jour et suppression.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/organizationApiDocPage.tsx"),
        "OrganizationApiDocPage",
    ),
})
