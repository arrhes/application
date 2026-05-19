import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const journalAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/journal",
    beforeLoad: () => ({
        title: "Journal",
        description:
            "Le journal comptable : document chronologique enregistrant toutes les opérations comptables de l'entreprise.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/JournalAccountingDocPage.tsx"),
        "JournalAccountingDocPage",
    ),
})
