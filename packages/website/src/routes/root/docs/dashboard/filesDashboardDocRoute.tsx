import { createRoute } from "@tanstack/react-router"
import { FilesDashboardDocPage } from "../../../../features/docs/dashboard/filesDashboardDocPage.js"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.js"

export const filesDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage",
    }),
    component: () => <FilesDashboardDocPage />,
})
