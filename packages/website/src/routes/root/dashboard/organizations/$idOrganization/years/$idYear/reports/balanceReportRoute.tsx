import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const balanceReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/reports/balanceReport/balanceReportPage.js"),
        "BalanceReportPage",
    ),
})
