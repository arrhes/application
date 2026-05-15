import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationLayoutRoute } from "./computationLayoutRoute.js"

export const computationPostesRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/postes",
    beforeLoad: () => ({
        title: "Postes",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/ComputationPostesTab.js"
            ),
        "ComputationPostesTab",
    ),
})
