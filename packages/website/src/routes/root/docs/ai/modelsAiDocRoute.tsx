import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const modelsAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/modèles",
    beforeLoad: () => ({
        title: "Modèles IA",
        description: "Les modèles de langage utilisés par l'assistant comptable d'Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/ai/modelsAiDocPage.tsx"), "ModelsAiDocPage"),
})
