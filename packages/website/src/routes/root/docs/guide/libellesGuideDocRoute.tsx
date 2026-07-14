import { createRoute } from "@tanstack/react-router"
import { TagsApiDocPage } from "../../../../features/docs/api/TagsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const libellesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Libellés d'écriture réutilisables : création, modification et suppression.",
    }),
    component: TagsApiDocPage,
})
