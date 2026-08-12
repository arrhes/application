import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { PremiersPasGuideDocPage } from "../../../../features/docs/guide/PremiersPasGuideDocPage.js"


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
            <PremiersPasGuideDocPage />
        </DocRoot>
    ),
})
