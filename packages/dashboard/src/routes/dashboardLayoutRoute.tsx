import { CircularLoader } from "@comptasse/ui"
import { createRoute, redirect } from "@tanstack/react-router"
import { DashboardLayout } from "../features/dashboard/dashboardLayout/DashboardLayout.js"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "dashboardLayout",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {
        const isAuthenticated = getIsAuthenticated()

        if (isAuthenticated !== true) {
            throw redirect({
                to: "/connexion",
            })
        }

        return {
            section: "Dashboard",
        }
    },
    component: DashboardLayout,
})
