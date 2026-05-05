import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const rootAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Assistant IA",
        description:
            "Documentation de l'assistant IA d'Arrhes : un assistant comptable intelligent pour gérer vos données.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/ai/rootAiDocPage.tsx"), "RootAiDocPage"),
})
