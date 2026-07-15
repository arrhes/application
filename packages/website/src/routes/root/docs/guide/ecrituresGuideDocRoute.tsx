import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const ecrituresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Saisie des écritures",
        description: "Enregistrer vos opérations comptables dans Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/EcrituresGuideDocPage.js")),
})
