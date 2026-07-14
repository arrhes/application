import { createRoute } from "@tanstack/react-router"
import { BalanceSheetsApiDocPage } from "../../../../features/docs/api/BalanceSheetsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const bilansGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Structure du bilan comptable : création, modification et suppression.",
    }),
    component: BalanceSheetsApiDocPage,
})
