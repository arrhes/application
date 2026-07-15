import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyJournauxGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/JournauxGuideDocPage.tsx"),
)

export const journauxGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
        description: "Journaux comptables de l'exercice : création, modification et suppression.",
    }),
    component: () => (
        <DocRoot>
            <LazyJournauxGuideDocPage />
        </DocRoot>
    ),
})
