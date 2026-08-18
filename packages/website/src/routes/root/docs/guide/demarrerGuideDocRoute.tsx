import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { StartGuideDocPage } from "../../../../features/docs/guide/StartGuideDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const demarrerGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/démarrer",
    beforeLoad: () => ({
        title: "Premiers pas",
        description:
            "Configurez Comptasse en quelques minutes : créez votre compte, votre organisation et votre premier exercice.",
    }),
    component: () => (
        <DocRoot>
            <StartGuideDocPage />
        </DocRoot>
    ),
})
