import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
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
    component: lazyRouteComponent(
        () => import("../features/dashboard/dashboardLayout/DashboardLayout.js"),
        "DashboardLayout",
    ),
})
