import { createRoute } from "@tanstack/react-router"
import { agentOrganizationPathRoute } from "./agentOrganizationPathRoute.js"

export const agentSessionPathRoute = createRoute({
    getParentRoute: () => agentOrganizationPathRoute,
    path: "/$idAgentSession",
    beforeLoad: () => ({
        title: undefined,
    }),
})
