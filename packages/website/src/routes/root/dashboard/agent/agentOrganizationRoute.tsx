import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { agentOrganizationPathRoute } from "./agentOrganizationPathRoute.js"

export const agentOrganizationRoute = createRoute({
    getParentRoute: () => agentOrganizationPathRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/agent/agentNewSessionPage.js"),
        "AgentNewSessionPage",
    ),
})
