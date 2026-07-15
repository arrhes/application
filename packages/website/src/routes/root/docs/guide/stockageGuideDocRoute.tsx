import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const stockageGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage & Fichiers",
        description: "Gérer vos pièces justificatives et documents numériques dans Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/StockageGuideDocPage.js")),
})
