import { createRoute } from "@tanstack/react-router"
import { AgentSkillGuideDocPage } from "../../../../features/docs/guide/AgentSkillGuideDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const agentSkillGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/agent",
    beforeLoad: () => ({
        title: "Agent IA externe",
        description: "Utiliser Arrhes avec un agent IA externe via l'API REST.",
    }),
    component: AgentSkillGuideDocPage,
})
