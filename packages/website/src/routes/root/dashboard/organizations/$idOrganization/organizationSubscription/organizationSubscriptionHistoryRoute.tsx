import { createRoute } from "@tanstack/react-router"
import { OrganizationSubscriptionHistoryPage } from "../../../../../../features/dashboard/$idOrganization/organizationSubscription/organizationSubscriptionHistoryPage.js"
import { organizationSubscriptionLayoutRoute } from "./organizationSubscriptionLayoutRoute.js"

export const organizationSubscriptionHistoryRoute = createRoute({
    getParentRoute: () => organizationSubscriptionLayoutRoute,
    path: "/historique",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationSubscriptionHistoryPage />,
})
