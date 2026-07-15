import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const compteDeResultatGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
        description: "Structure du compte de résultat : création, modification et suppression.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/CompteDeResultatGuideDocPage.js")),
})
