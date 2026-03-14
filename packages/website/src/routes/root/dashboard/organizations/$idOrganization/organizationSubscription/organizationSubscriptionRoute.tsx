import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationSubscriptionRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionPage.js"
            ),
        "OrganizationSubscriptionPage",
    ),
})
