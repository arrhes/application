import { createRoute, Outlet } from "@tanstack/react-router"
import { resourcesAccountingDocLayoutRoute } from "../resourcesAccountingDocLayoutRoute.js"

export const accountsAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => resourcesAccountingDocLayoutRoute,
    path: "/comptes",
    component: () => <Outlet />,
})
