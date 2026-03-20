import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const notesAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/annexe",
    beforeLoad: () => ({
        title: "Annexe comptable",
        description:
            "L'annexe comptable : document complémentaire au bilan et au compte de résultat, fournissant des informations détaillées.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/notesAccountingDocPage.tsx"),
        "NotesAccountingDocPage",
    ),
})
