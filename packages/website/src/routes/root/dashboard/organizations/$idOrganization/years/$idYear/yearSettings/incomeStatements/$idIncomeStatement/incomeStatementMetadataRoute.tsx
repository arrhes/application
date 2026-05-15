import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { incomeStatementLayoutRoute } from "./incomeStatementLayoutRoute.js"

export const incomeStatementMetadataRoute = createRoute({
    getParentRoute: () => incomeStatementLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/$idIncomeStatement/IncomeStatementMetadataTab.js"
            ),
        "IncomeStatementMetadataTab",
    ),
})
