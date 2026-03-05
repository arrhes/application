import { createRoute } from "@tanstack/react-router"
import { OrganizationSubscriptionLayout } from "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionLayout.js"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const organizationSubscriptionLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/abonnement",
    beforeLoad: () => ({
        title: "Abonnement",
    }),
    component: () => <OrganizationSubscriptionLayout />,
})
