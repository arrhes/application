import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationApiLayoutRoute } from "./organizationApiLayoutRoute.js"

export const organizationApiRoute = createRoute({
    getParentRoute: () => organizationApiLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationApi/organizationApiGeneralPage.js"
            ),
        "OrganizationApiGeneralPage",
    ),
})
