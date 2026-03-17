import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const reportsAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/documents",
    component: () => <Outlet />,
})
