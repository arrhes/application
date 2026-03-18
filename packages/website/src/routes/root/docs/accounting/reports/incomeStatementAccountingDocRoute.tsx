import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const incomeStatementAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/incomeStatementAccountingDocPage.tsx"),
        "IncomeStatementAccountingDocPage",
    ),
})
