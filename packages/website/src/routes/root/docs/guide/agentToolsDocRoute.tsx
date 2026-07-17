import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { AgentToolsDocPage } from "../../../../features/docs/guide/AgentToolsDocPage.js"

export const agentToolsDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/agent/outils",
    beforeLoad: () => ({
        title: "Outils et code",
        description: "Exemples TypeScript et Python pour utiliser l'API Arrhes avec un agent IA.",
    }),
    component: () => <AgentToolsDocPage />,
})
