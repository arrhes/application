import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "./incomeStatementsLayoutRoute.js"

export const incomeStatementsRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/incomeStatementsPage.js"
            ),
        "IncomeStatementsPage",
    ),
})
