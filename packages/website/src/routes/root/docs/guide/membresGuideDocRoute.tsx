import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyMembresGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/MembresGuideDocPage.tsx"),
)

export const membresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Gestion des membres d'une organisation : invitation, rôles et suppression.",
    }),
    component: () => (
        <DocRoot>
            <LazyMembresGuideDocPage />
        </DocRoot>
    ),
})
