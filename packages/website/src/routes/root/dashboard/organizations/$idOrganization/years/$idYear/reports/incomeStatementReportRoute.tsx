import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const incomeStatementReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../features/dashboard/$idYear/reports/incomeStatementReport/incomeStatementReportPage.js"
            ),
        "IncomeStatementReportPage",
    ),
})
