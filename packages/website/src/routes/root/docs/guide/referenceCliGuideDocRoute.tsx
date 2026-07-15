import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { ReferenceCliGuideDocPage } from "../../../../features/docs/guide/ReferenceCliGuideDocPage.tsx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const referenceCliGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/référence-cli",
    beforeLoad: () => ({
        title: "Référence CLI",
        description: "Tableau récapitulatif des commandes du CLI Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <ReferenceCliGuideDocPage />
        </DocRoot>
    ),
})
