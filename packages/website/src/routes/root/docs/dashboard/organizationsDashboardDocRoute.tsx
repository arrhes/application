import { createRoute } from "@tanstack/react-router"
import { OrganizationsDashboardDocPage } from "../../../../features/docs/dashboard/organizationsDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const organizationsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
    }),
    component: () => <OrganizationsDashboardDocPage />,
})
