import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationLayoutRoute } from "./computationLayoutRoute.js"

export const computationMetadataRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationMetadataTab.js"
            ),
        "ComputationMetadataTab",
    ),
})
