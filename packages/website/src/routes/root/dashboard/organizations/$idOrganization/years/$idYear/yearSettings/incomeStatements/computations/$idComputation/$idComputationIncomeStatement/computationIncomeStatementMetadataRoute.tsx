import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationIncomeStatementLayoutRoute } from "./computationIncomeStatementLayoutRoute.js"

export const computationIncomeStatementMetadataRoute = createRoute({
    getParentRoute: () => computationIncomeStatementLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/ComputationIncomeStatementMetadataTab.js"
            ),
        "ComputationIncomeStatementMetadataTab",
    ),
})
