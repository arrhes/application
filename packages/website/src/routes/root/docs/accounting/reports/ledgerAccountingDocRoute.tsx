import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const ledgerAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/grand-livre",
    beforeLoad: () => ({
        title: "Grand livre",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/ledgerAccountingDocPage.tsx"),
        "LedgerAccountingDocPage",
    ),
})
