import { createRoute, Outlet } from "@tanstack/react-router"
import { computationLayoutRoute } from "../computationLayoutRoute.js"

export const computationIncomeStatementLayoutRoute = createRoute({
    getParentRoute: () => computationLayoutRoute,
    path: "/$idComputationIncomeStatement",
    beforeLoad: () => ({
        title: "Terme du calcul",
    }),
    component: () => <Outlet />,
})
