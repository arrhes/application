import { createRoute } from "@tanstack/react-router"
import { OrganizationSecurityPage } from "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSecurityPage.js"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationSecurityRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/sécurité",
    beforeLoad: () => ({
        title: "Sécurité",
    }),
    component: () => <OrganizationSecurityPage />,
})
