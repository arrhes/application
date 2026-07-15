import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { MembresGuideDocPage } from "../../../../features/docs/guide/MembresGuideDocPage.tsx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

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
