import { createRoute, Outlet } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const guideDocLayoutRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/guide",
    component: () => <Outlet />,
})
