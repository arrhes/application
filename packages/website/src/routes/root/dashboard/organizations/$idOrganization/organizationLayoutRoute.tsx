import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationPathRoute } from "./organizationPathRoute.js"

export const organizationLayoutRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    id: "organizationLayout",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/dashboard/$idOrganization/organizationLayout.js"),
        "OrganizationLayout",
    ),
})
