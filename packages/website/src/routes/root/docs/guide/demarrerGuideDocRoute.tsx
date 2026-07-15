import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyPremiersPasGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/PremiersPasGuideDocPage.tsx"),
)

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
            <LazyPremiersPasGuideDocPage />
        </DocRoot>
    ),
})
