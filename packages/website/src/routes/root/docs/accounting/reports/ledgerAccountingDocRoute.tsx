import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const ledgerAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/grand-livre",
    beforeLoad: () => ({
        title: "Grand livre",
        description:
            "Le grand livre comptable : regroupement de toutes les écritures par compte, outil essentiel de suivi comptable.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/ledgerAccountingDocPage.tsx"),
        "LedgerAccountingDocPage",
    ),
})
