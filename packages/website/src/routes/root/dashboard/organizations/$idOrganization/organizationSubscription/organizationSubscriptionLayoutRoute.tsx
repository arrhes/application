import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const organizationSubscriptionLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/abonnement",
    beforeLoad: () => ({
        title: "Abonnement",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionLayout.js"
            ),
        "OrganizationSubscriptionLayout",
    ),
})
