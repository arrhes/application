import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const bilansGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Structure du bilan comptable : création, modification et suppression.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/BilansGuideDocPage.js")),
})
