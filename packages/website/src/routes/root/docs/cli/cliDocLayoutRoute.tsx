import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const cliDocLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/cli",
    component: () => <Outlet />,
})
