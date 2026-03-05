import { createRoute } from "@tanstack/react-router"
import { ComputationIncomeStatementPage } from "../../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/computationIncomeStatementPage.js"
import { computationIncomeStatementLayoutRoute } from "./computationIncomeStatementLayoutRoute.js"

export const computationIncomeStatementRoute = createRoute({
    getParentRoute: () => computationIncomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <ComputationIncomeStatementPage />,
})
