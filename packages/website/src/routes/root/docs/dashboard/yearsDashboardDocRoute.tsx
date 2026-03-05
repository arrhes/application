import { createRoute } from "@tanstack/react-router"
import { YearsDashboardDocPage } from "../../../../features/docs/dashboard/yearsDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const yearsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
    }),
    component: () => <YearsDashboardDocPage />,
})
