import { createRoute } from "@tanstack/react-router"
import { OrganizationApiKeysPage } from "../../../../../../features/dashboard/$idOrganization/organizationApi/keys/organizationApiKeysPage.js"
import { organizationApiLayoutRoute } from "./organizationApiLayoutRoute.js"

export const organizationApiKeysRoute = createRoute({
    getParentRoute: () => organizationApiLayoutRoute,
    path: "/clés",
    beforeLoad: () => ({
        title: "Clés",
    }),
    component: () => <OrganizationApiKeysPage />,
})
