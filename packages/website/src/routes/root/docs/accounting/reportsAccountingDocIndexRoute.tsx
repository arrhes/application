import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const reportsAccountingDocIndexRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/reports/reportsIndexPage.tsx"),
        "ReportsIndexPage",
    ),
})
