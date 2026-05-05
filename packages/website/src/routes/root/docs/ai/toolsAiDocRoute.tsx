import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const toolsAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/outils",
    beforeLoad: () => ({
        title: "Outils de l'assistant",
        description: "Liste complète des outils disponibles pour l'assistant comptable IA d'Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/ai/toolsAiDocPage.tsx"), "ToolsAiDocPage"),
})
