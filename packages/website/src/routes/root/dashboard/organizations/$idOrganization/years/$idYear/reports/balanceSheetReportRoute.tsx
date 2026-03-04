import { createRoute } from "@tanstack/react-router"
import { BalanceSheetReportPage } from "../../../../../../../../features/dashboard/$idYear/reports/balanceSheetReport/balanceSheetReportPage.js"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const balanceSheetReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
    }),
    component: () => <BalanceSheetReportPage />,
})
