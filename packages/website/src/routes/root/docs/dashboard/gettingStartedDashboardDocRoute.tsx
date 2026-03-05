import { createRoute } from "@tanstack/react-router"
import { GettingStartedDashboardDocPage } from "../../../../features/docs/dashboard/gettingStartedDashboardDocPage.tsx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const gettingStartedDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/démarrage",
    beforeLoad: () => ({
        title: "Démarrage",
    }),
    component: () => <GettingStartedDashboardDocPage />,
})
