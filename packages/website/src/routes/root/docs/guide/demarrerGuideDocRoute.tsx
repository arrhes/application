import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { PremiersPasGuideDocPage } from "../../../../features/docs/guide/PremiersPasGuideDocPage.tsx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const demarrerGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/démarrer",
    beforeLoad: () => ({
        title: "Premiers pas",
        description:
            "Configurez Arrhes en quelques minutes : créez votre compte, votre organisation et votre premier exercice.",
    }),
    component: () => (
        <DocRoot>
            <PremiersPasGuideDocPage />
        </DocRoot>
    ),
})
