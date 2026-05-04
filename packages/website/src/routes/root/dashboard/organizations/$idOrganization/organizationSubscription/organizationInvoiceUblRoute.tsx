import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationInvoiceUblRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/facture/$idInvoice",
    beforeLoad: () => ({
        title: "Facture XML",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationSubscription/invoices/organizationInvoiceUblPage.js"
            ),
        "OrganizationInvoiceUblPage",
    ),
})
