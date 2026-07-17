import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { BilansGuideDocPage } from "../../../../features/docs/guide/BilansGuideDocPage.js"

export const bilansGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/bilans",
    beforeLoad: () => ({
        title: "Bilans",
        description: "Structure du bilan comptable : création, modification et suppression.",
    }),
    component: () => <BilansGuideDocPage />,
})
