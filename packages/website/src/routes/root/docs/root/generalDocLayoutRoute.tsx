import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const generalDocLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    id: "general",
    component: () => <Outlet />,
})
