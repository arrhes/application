import { createRoute, Outlet } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "../incomeStatementsLayoutRoute.js"

export const incomeStatementLayoutRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/$idIncomeStatement",
    beforeLoad: () => ({
        title: "Ligne de compte de résultat",
    }),
    component: () => <Outlet />,
})
