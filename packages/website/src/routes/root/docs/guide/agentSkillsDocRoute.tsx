import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const agentSkillsDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: "Skills agent IA",
        description: "Skills Markdown pour configurer votre agent IA avec Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/AgentSkillsDocPage.js")),
})
