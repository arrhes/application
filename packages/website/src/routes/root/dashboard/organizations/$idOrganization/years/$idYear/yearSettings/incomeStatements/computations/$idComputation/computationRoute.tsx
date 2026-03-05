import { createRoute } from "@tanstack/react-router"
import { ComputationPage } from "../../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationPage.js"
import { computationLayoutRoute } from "./computationLayoutRoute.js"

export const computationRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <ComputationPage />,
})
