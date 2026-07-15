import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

const LazyBalanceSheetAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/reports/BalanceSheetAccountingDocPage.tsx"),
)

export const balanceSheetAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/bilan",
    beforeLoad: () => ({
        title: "Bilan",
        description:
            "Le bilan comptable : document de synthèse présentant le patrimoine de l'entreprise (actif et passif) à la clôture de l'exercice.",
    }),
    component: () => (
        <DocRoot>
            <LazyBalanceSheetAccountingDocPage />
        </DocRoot>
    ),
})
