import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const organizationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/organizationApiDocPage.tsx"),
        "OrganizationApiDocPage",
    ),
})
