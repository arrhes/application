import { createRoute } from "@tanstack/react-router"
import { AccountsApiDocPage } from "../../../../features/docs/api/AccountsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const comptesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description: "Plan comptable de l'exercice : création, modification et suppression des comptes.",
    }),
    component: AccountsApiDocPage,
})
