import { createRoute, Outlet } from "@tanstack/react-router"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const commandsCliDocLayoutRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/commandes",
    component: () => <Outlet />,
})
