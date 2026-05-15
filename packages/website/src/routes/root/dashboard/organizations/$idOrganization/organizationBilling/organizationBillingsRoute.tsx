import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationBillingLayoutRoute } from "./organizationBillingLayoutRoute.js"

export const organizationServicesRoute = createRoute({
    getParentRoute: () => organizationBillingLayoutRoute,
    path: "/services",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/dashboard/$idOrganization/organizationBilling/OrganizationServicesPage.js"
            ),
        "OrganizationServicesPage",
    ),
})
