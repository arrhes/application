import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.tsx"

export const introductionAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/introduction",
    component: () => <Outlet />,
})
