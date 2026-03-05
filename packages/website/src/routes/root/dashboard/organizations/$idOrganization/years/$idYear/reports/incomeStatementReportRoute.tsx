import { createRoute } from "@tanstack/react-router"
import { IncomeStatementReportPage } from "../../../../../../../../features/dashboard/$idYear/reports/incomeStatementReport/incomeStatementReportPage.js"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const incomeStatementReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
    }),
    component: () => <IncomeStatementReportPage />,
})
