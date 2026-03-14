import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const supportRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
    }),
    component: lazyRouteComponent(() => import("../../../../features/dashboard/support/supportPage.js"), "SupportPage"),
})
