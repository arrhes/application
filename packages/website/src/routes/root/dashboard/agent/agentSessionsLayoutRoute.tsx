import { createRoute } from "@tanstack/react-router"
import { agentLayoutRoute } from "./agentLayoutRoute.js"

export const agentSessionsLayoutRoute = createRoute({
    getParentRoute: () => agentLayoutRoute,
    path: "/sessions",
})
