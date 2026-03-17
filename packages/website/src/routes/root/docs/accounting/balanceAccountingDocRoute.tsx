import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const balanceAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/reports/balancePage.tsx"),
        "BalancePage",
    ),
})
