import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsLayoutRoute } from "./reportsLayoutRoute.js"

export const journalReportRoute = createRoute({
    getParentRoute: () => reportsLayoutRoute,
    path: "/livre-journal",
    beforeLoad: () => ({
        title: "Livre-journal",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/reports/journalReport/journalReportPage.js"),
        "JournalReportPage",
    ),
})
