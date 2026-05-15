import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationBillingLayoutRoute } from "./organizationBillingLayoutRoute.js"

export const organizationInvoicesRoute = createRoute({
    getParentRoute: () => organizationBillingLayoutRoute,
    path: "/factures",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationBilling/invoices/OrganizationInvoicesPage.js"
            ),
        "OrganizationInvoicesPage",
    ),
})
