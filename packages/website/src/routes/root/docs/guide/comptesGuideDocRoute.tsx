import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyComptesGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/ComptesGuideDocPage.tsx"),
)

export const comptesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description: "Plan comptable de l'exercice : création, modification et suppression des comptes.",
    }),
    component: () => (
        <DocRoot>
            <LazyComptesGuideDocPage />
        </DocRoot>
    ),
})
