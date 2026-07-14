import { createRoute } from "@tanstack/react-router"
import { GettingStartedDashboardDocPage } from "../../../../features/docs/dashboard/GettingStartedDashboardDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const demarrerGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/démarrer",
    beforeLoad: () => ({
        title: "Démarrer avec Arrhes",
        description:
            "Guide de démarrage rapide : créez votre compte, configurez votre première organisation et commencez votre comptabilité.",
    }),
    component: GettingStartedDashboardDocPage,
})
