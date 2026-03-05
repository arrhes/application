import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsPage } from "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSettingsPage.js"
import { organizationSettingsLayoutRoute } from "./organizationSettingsLayoutRoute.js"

export const organizationSettingsRoute = createRoute({
    getParentRoute: () => organizationSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationSettingsPage />,
})
