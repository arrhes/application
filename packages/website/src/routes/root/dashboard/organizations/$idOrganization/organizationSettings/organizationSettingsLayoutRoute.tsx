import { createRoute } from "@tanstack/react-router"
import { OrganizationSettingsLayout } from "../../../../../../features/dashboard/$idOrganization/organizationSettings/organizationSettingsLayout.js"
import { organizationLayoutRoute } from "../organizationLayoutRoute.js"

export const organizationSettingsLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: () => <OrganizationSettingsLayout />,
})
