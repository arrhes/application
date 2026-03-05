import { createRoute, Outlet } from "@tanstack/react-router"
import { incomeStatementsLayoutRoute } from "../incomeStatementsLayoutRoute.js"

export const computationsLayoutRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/calculs",
    beforeLoad: () => ({
        title: "Calculs",
    }),
    component: () => <Outlet />,
})
