import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const incomeStatementAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
        description:
            "Le compte de résultat : document de synthèse présentant les produits et charges de l'exercice pour déterminer le résultat net.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/incomeStatementAccountingDocPage.tsx"),
        "IncomeStatementAccountingDocPage",
    ),
})
