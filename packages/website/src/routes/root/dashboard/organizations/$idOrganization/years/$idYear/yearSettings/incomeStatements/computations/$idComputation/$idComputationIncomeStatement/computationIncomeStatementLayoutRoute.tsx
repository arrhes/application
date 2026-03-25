import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationsLayoutRoute } from "../../computationsLayoutRoute.js"

export const computationIncomeStatementLayoutRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/$idComputation/postes/$idComputationIncomeStatement",
    beforeLoad: () => ({
        title: "Terme du calcul",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/computationIncomeStatementLayout.js"
            ),
        "ComputationIncomeStatementLayout",
    ),
})
