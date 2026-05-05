import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.tsx"

export const reportsAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/documents",
    component: () => <Outlet />,
})
