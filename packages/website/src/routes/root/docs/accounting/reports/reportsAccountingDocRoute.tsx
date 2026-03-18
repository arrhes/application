import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const reportsAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/reportsAccountingDocPage.tsx"),
        "ReportsAccountingDocPage",
    ),
})
