import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { supportLayoutRoute } from "./supportLayoutRoute.js"

export const supportRoute = createRoute({
    getParentRoute: () => supportLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(() => import("../../../../features/dashboard/support/SupportPage.js"), "SupportPage"),
})
