import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.js"

export const scenariosAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/scénarios",
    component: () => <Outlet />,
})
