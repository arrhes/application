import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyAuthentificationGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/AuthentificationGuideDocPage.tsx"),
)

export const authentificationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification",
        description: "Authentifiez-vous sur Arrhes : connexion au dashboard, clés API et connexion du CLI.",
    }),
    component: () => (
        <DocRoot>
            <LazyAuthentificationGuideDocPage />
        </DocRoot>
    ),
})
