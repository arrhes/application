import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayoutRoute.js"

export const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/dashboard",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ context }) => {
        if (context.isAdminAuthenticated !== true) {
            throw redirect({ to: "/connexion" })
        }
        return {
            section: "Dashboard",
        }
    },
    component: lazyRouteComponent(
        () => import("../../../features/dashboard/dashboardLayout.js"),
        "AdminDashboardLayout",
    ),
})
