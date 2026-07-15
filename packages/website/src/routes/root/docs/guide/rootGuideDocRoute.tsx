import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyRootGuideDocPage = lazyRouteComponent(() => import("../../../../features/docs/guide/RootGuideDocPage.tsx"))

export const rootGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation",
        description:
            "Guide pratique d'Arrhes : découvrez chaque fonctionnalité sous ses trois interfaces — dashboard, API et CLI.",
    }),
    component: () => (
        <DocRoot>
            <LazyRootGuideDocPage />
        </DocRoot>
    ),
})
