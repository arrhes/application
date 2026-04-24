import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationInvoicesRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/factures",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationInvoicesPage.js"
            ),
        "OrganizationInvoicesPage",
    ),
})
