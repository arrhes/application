import { createRoute } from "@tanstack/react-router"
import { RootDashboardDocPage } from "../../../../features/docs/dashboard/rootDashboardDocPage.tsx"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const rootDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation",
    }),
    component: () => <RootDashboardDocPage />,
})
