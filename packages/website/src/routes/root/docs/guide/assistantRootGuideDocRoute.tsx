import { createRoute } from "@tanstack/react-router"
import { RootAiDocPage } from "../../../../features/docs/ai/RootAiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const assistantRootGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/assistant",
    beforeLoad: () => ({
        title: "Assistant IA",
        description: "Présentation de l'assistant IA intégré à Arrhes.",
    }),
    component: RootAiDocPage,
})
