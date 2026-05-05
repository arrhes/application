import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizations/$idOrganization/organizationLayoutRoute.js"

export const agentLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: "Assistant",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/$idOrganization/agent/agentLayout.js"),
        "AgentLayout",
    ),
})
