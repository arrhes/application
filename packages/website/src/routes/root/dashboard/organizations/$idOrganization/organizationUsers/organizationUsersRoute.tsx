import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationUsersLayoutRoute } from "./organizationUsersLayoutRoute.js"

export const organizationUsersRoute = createRoute({
    getParentRoute: () => organizationUsersLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/dashboard/$idOrganization/organizationUsers/organizationUsersPage.js"),
        "OrganizationUsersPage",
    ),
})
