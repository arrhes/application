import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationBillingLayoutRoute } from "./organizationBillingLayoutRoute.js"

export const organizationInvoiceUblRoute = createRoute({
    getParentRoute: () => organizationBillingLayoutRoute,
    path: "/facture/$idInvoice",
    beforeLoad: () => ({
        title: "Facture XML",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationBilling/invoices/organizationInvoicePage.js"
            ),
        "OrganizationInvoicePage",
    ),
})
