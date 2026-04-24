import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationServicesRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/services",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationServicesPage.js"
            ),
        "OrganizationServicesPage",
    ),
})
