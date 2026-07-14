import { createRoute } from "@tanstack/react-router"
import { JournalsApiDocPage } from "../../../../features/docs/api/JournalsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const journauxGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
        description: "Journaux comptables de l'exercice : création, modification et suppression.",
    }),
    component: JournalsApiDocPage,
})
