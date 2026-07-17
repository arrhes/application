import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { RootGuideDocPage } from "../../../../features/docs/guide/RootGuideDocPage.js"


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
            <RootGuideDocPage />
        </DocRoot>
    ),
})
