import { createRoute } from "@tanstack/react-router"
import { ToolsAiDocPage } from "../../../../features/docs/ai/ToolsAiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const assistantToolsGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/assistant/outils",
    beforeLoad: () => ({
        title: "Outils",
        description: "Catalogue des outils disponibles pour l'assistant IA.",
    }),
    component: ToolsAiDocPage,
})
