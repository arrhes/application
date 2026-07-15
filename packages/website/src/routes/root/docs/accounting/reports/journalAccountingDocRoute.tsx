import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

const LazyJournalAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/reports/JournalAccountingDocPage.tsx"),
)

export const journalAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/journal",
    beforeLoad: () => ({
        title: "Journal",
        description:
            "Le journal comptable : document chronologique enregistrant toutes les opérations comptables de l'entreprise.",
    }),
    component: () => (
        <DocRoot>
            <LazyJournalAccountingDocPage />
        </DocRoot>
    ),
})
