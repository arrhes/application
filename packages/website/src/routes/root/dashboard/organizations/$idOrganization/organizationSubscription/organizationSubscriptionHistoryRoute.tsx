import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationSubscriptionHistoryRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/historique",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionHistoryPage.js"
            ),
        "OrganizationSubscriptionHistoryPage",
    ),
})
