import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyReferenceApiGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/ReferenceApiGuideDocPage.tsx"),
)

export const referenceApiGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/référence-api",
    beforeLoad: () => ({
        title: "Référence API",
        description: "Conventions, codes d'erreur et catalogue des endpoints de l'API Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <LazyReferenceApiGuideDocPage />
        </DocRoot>
    ),
})
