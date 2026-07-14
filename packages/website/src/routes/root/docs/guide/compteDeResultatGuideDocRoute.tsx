import { createRoute } from "@tanstack/react-router"
import { IncomeStatementsApiDocPage } from "../../../../features/docs/api/IncomeStatementsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const compteDeResultatGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/compte-de-résultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
        description: "Structure du compte de résultat : création, modification et suppression.",
    }),
    component: IncomeStatementsApiDocPage,
})
