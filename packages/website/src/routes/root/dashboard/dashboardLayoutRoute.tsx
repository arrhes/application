import { CircularLoader } from "@arrhes/ui"
import { createRoute, redirect } from "@tanstack/react-router"
import { DashboardLayout } from "../../../features/dashboard/dashboardLayout.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/dashboard",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ context }) => {
        if (context.isAuthenticated !== true) {
            throw redirect({
                to: "/connexion",
            })
        }
    },
    component: () => <DashboardLayout />,
})
