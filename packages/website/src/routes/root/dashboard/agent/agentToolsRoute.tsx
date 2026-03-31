import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { agentLayoutRoute } from "./agentLayoutRoute.js"

export const agentToolsRoute = createRoute({
    getParentRoute: () => agentLayoutRoute,
    path: "/outils",
    beforeLoad: () => ({
        title: "Outils de l'assistant",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/agent/agentToolsPage.js"),
        "AgentToolsPage",
    ),
})
