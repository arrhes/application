import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const apiDocLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/api",
    component: () => <Outlet />,
})
