import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { agentSessionPathRoute } from "./agentSessionPathRoute.js"

export const agentSessionRoute = createRoute({
    getParentRoute: () => agentSessionPathRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/agent/agentSessionPage.js"),
        "AgentSessionPage",
    ),
})
