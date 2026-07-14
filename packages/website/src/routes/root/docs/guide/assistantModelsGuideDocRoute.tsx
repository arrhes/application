import { createRoute } from "@tanstack/react-router"
import { ModelsAiDocPage } from "../../../../features/docs/ai/ModelsAiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const assistantModelsGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/assistant/modèles",
    beforeLoad: () => ({
        title: "Modèles",
        description: "Architecture de l'assistant IA : router et executor.",
    }),
    component: ModelsAiDocPage,
})
