import { createRoute } from "@tanstack/react-router"
import { LedgerReportPage } from "../../../../../../../../features/dashboard/$idYear/reports/ledgerReport/ledgerReportPage.js"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const ledgerReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/grand-livre",
    beforeLoad: () => ({
        title: "Grand livre",
    }),
    component: () => <LedgerReportPage />,
})
