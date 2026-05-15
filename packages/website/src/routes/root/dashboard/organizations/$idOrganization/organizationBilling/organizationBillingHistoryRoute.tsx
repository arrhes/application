import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationBillingLayoutRoute } from "./organizationBillingLayoutRoute.js"

export const organizationBillingHistoryRoute = createRoute({
    getParentRoute: () => organizationBillingLayoutRoute,
    path: "/historique",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationBilling/OrganizationBillingHistoryPage.js"
            ),
        "OrganizationBillingHistoryPage",
    ),
})
