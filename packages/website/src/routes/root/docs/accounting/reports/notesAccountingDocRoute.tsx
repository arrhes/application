import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

const LazyNotesAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/reports/NotesAccountingDocPage.tsx"),
)

export const notesAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/annexe",
    beforeLoad: () => ({
        title: "Annexe comptable",
        description:
            "L'annexe comptable : document complémentaire au bilan et au compte de résultat, fournissant des informations détaillées.",
    }),
    component: () => (
        <DocRoot>
            <LazyNotesAccountingDocPage />
        </DocRoot>
    ),
})
