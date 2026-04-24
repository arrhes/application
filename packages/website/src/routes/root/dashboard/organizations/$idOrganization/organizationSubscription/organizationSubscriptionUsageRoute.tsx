import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationSubscriptionUsageRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/utilisation",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionUsagePage.js"
            ),
        "OrganizationSubscriptionUsagePage",
    ),
})
