import { createRoute } from "@tanstack/react-router"
import { FilesDashboardDocPage } from "../../../../features/docs/dashboard/FilesDashboardDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const stockageGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Stockage & Fichiers",
        description: "Gérer vos pièces justificatives et documents numériques dans Arrhes.",
    }),
    component: FilesDashboardDocPage,
})
