import { createRoute } from "@tanstack/react-router"
import { RecordsDashboardDocPage } from "../../../../features/docs/dashboard/recordsDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const recordsDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures",
    }),
    component: () => <RecordsDashboardDocPage />,
})
