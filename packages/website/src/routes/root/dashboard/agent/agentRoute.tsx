import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "../dashboardLayoutRoute.js"

export const agentRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/agent/agentSelectOrganization.js"),
        "AgentSelectOrganization",
    ),
})
