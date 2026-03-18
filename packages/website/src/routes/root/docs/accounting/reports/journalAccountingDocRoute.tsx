import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const journalAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/journal",
    beforeLoad: () => ({
        title: "Journal",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/journalAccountingDocPage.tsx"),
        "JournalAccountingDocPage",
    ),
})
