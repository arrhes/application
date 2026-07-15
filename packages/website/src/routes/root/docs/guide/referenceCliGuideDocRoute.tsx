import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyReferenceCliGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/ReferenceCliGuideDocPage.tsx"),
)

export const referenceCliGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/référence-cli",
    beforeLoad: () => ({
        title: "Référence CLI",
        description: "Tableau récapitulatif des commandes du CLI Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <LazyReferenceCliGuideDocPage />
        </DocRoot>
    ),
})
