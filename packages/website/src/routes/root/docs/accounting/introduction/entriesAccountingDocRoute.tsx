import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.tsx"

export const entriesAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures comptables",
        description:
            "Apprenez à passer des écritures comptables : lignes de débit et crédit, pièces justificatives et enregistrement des opérations.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/entriesAccountingDocPage.tsx"),
        "EntriesAccountingDocPage",
    ),
})
