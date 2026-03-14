import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const reportsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/reportsAccountingDocPage.tsx"),
        "ReportsAccountingDocPage",
    ),
})
