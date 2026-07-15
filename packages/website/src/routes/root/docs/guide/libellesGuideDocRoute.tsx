import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyLibellesGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/LibellesGuideDocPage.tsx"),
)

export const libellesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Libellés d'écriture réutilisables : création, modification et suppression.",
    }),
    component: () => (
        <DocRoot>
            <LazyLibellesGuideDocPage />
        </DocRoot>
    ),
})
