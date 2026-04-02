import { createRoute } from "@tanstack/react-router"
import { agentSessionsLayoutRoute } from "./agentSessionsLayoutRoute.js"

export const agentSessionPathRoute = createRoute({
    getParentRoute: () => agentSessionsLayoutRoute,
    path: "/$idAgentSession",
    beforeLoad: () => ({
        title: undefined,
    }),
})
