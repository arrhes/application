import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const adminLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/admin",
    beforeLoad: async ({ context }) => {
        const userSession = await context.userSession

        if (userSession?.user.isSuperAdmin !== true) {
            throw redirect({
                to: "/dashboard",
            })
        }

        return {
            title: "Admin",
        }
    },
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/admin/adminPanelLayout.js"),
        "AdminPanelLayout",
    ),
})
