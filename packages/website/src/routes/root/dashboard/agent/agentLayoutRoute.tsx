import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationPathRoute } from "../organizations/$idOrganization/organizationPathRoute.js"

export const agentLayoutRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: "Assistant",
    }),
    component: lazyRouteComponent(() => import("../../../../features/dashboard/agent/agentPage.js"), "AgentPage"),
})
