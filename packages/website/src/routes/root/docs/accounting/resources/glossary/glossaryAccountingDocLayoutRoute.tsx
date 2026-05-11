import { createRoute, Outlet } from "@tanstack/react-router"
import { resourcesAccountingDocLayoutRoute } from "../resourcesAccountingDocLayoutRoute.tsx"

export const glossaryAccountingDocLayoutRoute = createRoute({
    getParentRoute: () => resourcesAccountingDocLayoutRoute,
    path: "/glossaire",
    component: () => <Outlet />,
})
