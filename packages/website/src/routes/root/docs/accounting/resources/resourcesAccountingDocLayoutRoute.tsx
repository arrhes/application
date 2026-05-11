import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.tsx"

export const resourcesAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/ressources",
    component: () => <Outlet />,
})
