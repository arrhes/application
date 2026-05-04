import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationBillingLayoutRoute } from "./organizationBillingLayoutRoute.js"

export const organizationBillingRoute = createRoute({
    getParentRoute: () => organizationBillingLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationBilling/wallet/organizationWalletPage.js"
            ),
        "OrganizationWalletPage",
    ),
})
