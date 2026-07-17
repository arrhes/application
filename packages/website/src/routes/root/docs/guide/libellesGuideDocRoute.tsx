import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { LibellesGuideDocPage } from "../../../../features/docs/guide/LibellesGuideDocPage.js"


export const libellesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Libellés d'écriture réutilisables : création, modification et suppression.",
    }),
    component: () => (
        <DocRoot>
            <LibellesGuideDocPage />
        </DocRoot>
    ),
})
