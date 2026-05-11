import { createRoute, Outlet } from "@tanstack/react-router"
import { resourcesAccountingDocLayoutRoute } from "../resourcesAccountingDocLayoutRoute.js"

export const scenariosAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => resourcesAccountingDocLayoutRoute,
    path: "/scénarios",
    component: () => <Outlet />,
})
