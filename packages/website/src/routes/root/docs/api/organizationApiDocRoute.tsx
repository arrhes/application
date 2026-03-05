import { createRoute } from "@tanstack/react-router"
import { OrganizationApiDocPage } from "../../../../features/docs/api/organizationApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const organizationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/organisation",
    beforeLoad: () => ({
        title: "Organisation",
    }),
    component: () => <OrganizationApiDocPage />,
})
