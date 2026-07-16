import { createRoute, Outlet } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    component: () => <div style={{ padding: "2rem" }}><h1>DOCS WORKS</h1><Outlet /></div>,
})
