import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { StockageGuideDocPage } from "../../../../features/docs/guide/StockageGuideDocPage.js"

export const stockageGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage & Fichiers",
        description: "Gérer vos pièces justificatives et documents numériques dans Arrhes.",
    }),
    component: () => <StockageGuideDocPage />,
})
