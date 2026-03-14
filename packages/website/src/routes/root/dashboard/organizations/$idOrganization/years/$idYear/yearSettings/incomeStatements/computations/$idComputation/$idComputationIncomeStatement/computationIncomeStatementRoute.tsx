import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationIncomeStatementLayoutRoute } from "./computationIncomeStatementLayoutRoute.js"

export const computationIncomeStatementRoute = createRoute({
    getParentRoute: () => computationIncomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/computationIncomeStatementPage.js"
            ),
        "ComputationIncomeStatementPage",
    ),
})
