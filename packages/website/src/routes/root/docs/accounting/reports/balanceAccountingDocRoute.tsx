import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const balanceAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance",
        description:
            "La balance comptable : tableau récapitulatif des soldes débiteurs et créditeurs de tous les comptes d'un exercice.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/balanceAccountingDocPage.tsx"),
        "BalanceAccountingDocPage",
    ),
})
