import { createRoute } from "@tanstack/react-router"
import { ReportsDashboardDocPage } from "../../../../features/docs/dashboard/reportsDashboardDocPage.tsx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const reportsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents de synthèse",
    }),
    component: () => <ReportsDashboardDocPage />,
})
