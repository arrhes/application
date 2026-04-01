import { createRoute } from "@tanstack/react-router"
import { agentLayoutRoute } from "./agentLayoutRoute.js"

export const agentSessionPathRoute = createRoute({
    getParentRoute: () => agentLayoutRoute,
    path: "/$idAgentSession",
    beforeLoad: () => ({
        title: undefined,
    }),
})
