import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { incomeStatementLayoutRoute } from "./incomeStatementLayoutRoute.js"

export const incomeStatementRoute = createRoute({
    getParentRoute: () => incomeStatementLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementPage.js"
            ),
        "IncomeStatementPage",
    ),
})
