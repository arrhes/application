import { createRoute } from "@tanstack/react-router"
import { OrganizationApiGeneralPage } from "../../../../../../features/dashboard/$idOrganization/organizationApi/organizationApiGeneralPage.js"
import { organizationApiLayoutRoute } from "./organizationApiLayoutRoute.js"

export const organizationApiRoute = createRoute({
    getParentRoute: () => organizationApiLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationApiGeneralPage />,
})
