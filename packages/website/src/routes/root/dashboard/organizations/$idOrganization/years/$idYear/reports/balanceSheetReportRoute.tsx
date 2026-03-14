import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const balanceSheetReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../features/dashboard/$idYear/reports/balanceSheetReport/balanceSheetReportPage.js"
            ),
        "BalanceSheetReportPage",
    ),
})
