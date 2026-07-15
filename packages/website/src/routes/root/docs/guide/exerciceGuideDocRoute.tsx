import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyExerciceGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/ExerciceGuideDocPage.tsx"),
)

export const exerciceGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
        description: "Créez et gérez le cycle de vie de vos exercices comptables dans Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <LazyExerciceGuideDocPage />
        </DocRoot>
    ),
})
