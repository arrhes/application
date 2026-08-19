import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { CompteDeResultatGuideDocPage } from "../../../../features/docs/guide/CompteDeResultatGuideDocPage.js"

export const compteDeResultatGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
        description: "Structure du compte de résultat : création, modification et suppression.",
    }),
    component: () => <CompteDeResultatGuideDocPage />,
})
