import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const balanceSheetAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
        description:
            "Le bilan comptable : document de synthèse présentant le patrimoine de l'entreprise (actif et passif) à la clôture de l'exercice.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/balanceSheetAccountingDocPage.tsx"),
        "BalanceSheetAccountingDocPage",
    ),
})
