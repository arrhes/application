import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const ledgerReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/grand-livre",
    beforeLoad: () => ({
        title: "Grand livre",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/reports/ledgerReport/ledgerReportPage.js"),
        "LedgerReportPage",
    ),
})
