import { createRoute } from "@tanstack/react-router"
import { IncomeStatementsPage } from "../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/incomeStatementsPage.js"
import { incomeStatementsLayoutRoute } from "./incomeStatementsLayoutRoute.js"

export const incomeStatementsRoute = createRoute({
    getParentRoute: () => incomeStatementsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <IncomeStatementsPage />,
})
