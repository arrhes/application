import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "../incomeStatementsLayoutRoute.js"

export const incomeStatementLayoutRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/$idIncomeStatement",
    beforeLoad: () => ({
        title: "Ligne de compte de résultat",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayout.js"
            ),
        "IncomeStatementLayout",
    ),
})
