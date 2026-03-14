import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const reportsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/reports/reportsLayout.js"),
        "ReportsLayout",
    ),
})
