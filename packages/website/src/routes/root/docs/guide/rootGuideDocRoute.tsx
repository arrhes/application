import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/RootGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

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
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
