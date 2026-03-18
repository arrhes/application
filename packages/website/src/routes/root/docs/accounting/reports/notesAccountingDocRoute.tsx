import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const notesAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/annexe",
    beforeLoad: () => ({
        title: "Annexe comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/notesAccountingDocPage.tsx"),
        "NotesAccountingDocPage",
    ),
})
