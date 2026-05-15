import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationsLayoutRoute } from "../computationsLayoutRoute.js"

export const computationLayoutRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/$idComputation",
    beforeLoad: () => ({
        title: "Calcul",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/ComputationLayout.js"
            ),
        "ComputationLayout",
    ),
})
