import { createRoute } from "@tanstack/react-router"
import { OrganizationApiLayout } from "../../../../../../features/dashboard/$idOrganization/organizationApi/organizationApiLayout.js"
import { organizationLayoutRoute } from "../organizationLayoutRoute.tsx"

export const organizationApiLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/api",
    beforeLoad: () => ({
        title: "API",
    }),
    component: () => <OrganizationApiLayout />,
})
