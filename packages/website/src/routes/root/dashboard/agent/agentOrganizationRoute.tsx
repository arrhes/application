import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { agentLayoutRoute } from "./agentLayoutRoute.js"

export const agentOrganizationRoute = createRoute({
    getParentRoute: () => agentLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/agent/agentNewSessionPage.js"),
        "AgentNewSessionPage",
    ),
})
