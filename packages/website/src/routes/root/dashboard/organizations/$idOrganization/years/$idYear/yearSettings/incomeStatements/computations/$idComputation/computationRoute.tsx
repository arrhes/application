import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationLayoutRoute } from "./computationLayoutRoute.js"

export const computationRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPage.js"
            ),
        "ComputationPage",
    ),
})
