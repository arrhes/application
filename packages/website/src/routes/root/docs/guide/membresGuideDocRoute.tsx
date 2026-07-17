import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { MembresGuideDocPage } from "../../../../features/docs/guide/MembresGuideDocPage.js"


export const membresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Gestion des membres d'une organisation : invitation, rôles et suppression.",
    }),
    component: () => (
        <DocRoot>
            <MembresGuideDocPage />
        </DocRoot>
    ),
})
