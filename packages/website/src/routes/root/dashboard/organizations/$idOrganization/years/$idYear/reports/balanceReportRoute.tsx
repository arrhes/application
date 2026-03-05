import { createRoute } from "@tanstack/react-router"
import { BalanceReportPage } from "../../../../../../../../features/dashboard/$idYear/reports/balanceReport/balanceReportPage.js"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const balanceReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance",
    }),
    component: () => <BalanceReportPage />,
})
