import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.tsx"

export const glossaryAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/glossaire",
    component: () => <Outlet />,
})
