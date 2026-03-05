import { createRoute } from "@tanstack/react-router"
import { OrganizationLayout } from "../../../../../features/dashboard/$idOrganization/organizationLayout.js"
import { organizationPathRoute } from "./organizationPathRoute.js"

export const organizationLayoutRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    id: "organizationLayout",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <OrganizationLayout />,
})
