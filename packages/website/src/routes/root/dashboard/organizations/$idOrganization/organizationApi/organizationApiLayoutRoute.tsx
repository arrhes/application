import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.tsx"

export const organizationApiLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/api",
    beforeLoad: () => ({
        title: "API",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/dashboard/$idOrganization/organizationApi/organizationApiLayout.js"),
        "OrganizationApiLayout",
    ),
})
