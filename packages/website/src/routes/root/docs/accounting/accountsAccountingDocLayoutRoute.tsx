import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const accountsAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/comptes",
    component: () => <Outlet />,
})
