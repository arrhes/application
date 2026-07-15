import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

const LazyBalanceAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/reports/BalanceAccountingDocPage.tsx"),
)

export const balanceAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/balance",
    beforeLoad: () => ({
        title: "Balance",
        description:
            "La balance comptable : tableau récapitulatif des soldes débiteurs et créditeurs de tous les comptes d'un exercice.",
    }),
    component: () => (
        <DocRoot>
            <LazyBalanceAccountingDocPage />
        </DocRoot>
    ),
})
