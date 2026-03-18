import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const balanceSheetAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/balanceSheetAccountingDocPage.tsx"),
        "BalanceSheetAccountingDocPage",
    ),
})
