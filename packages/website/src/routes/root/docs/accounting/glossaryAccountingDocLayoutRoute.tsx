import { createRoute, Outlet } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const glossaryAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/glossaire",
    component: () => <Outlet />,
})
