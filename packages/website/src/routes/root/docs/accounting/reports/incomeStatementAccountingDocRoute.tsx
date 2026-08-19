import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"
import { IncomeStatementAccountingDocPage } from "../../../../../features/docs/accounting/reports/IncomeStatementAccountingDocPage.js"


export const incomeStatementAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
        description:
            "Le compte de résultat : document de synthèse présentant les produits et charges de l'exercice pour déterminer le résultat net.",
    }),
    component: () => (
        <DocRoot>
            <IncomeStatementAccountingDocPage />
        </DocRoot>
    ),
})
