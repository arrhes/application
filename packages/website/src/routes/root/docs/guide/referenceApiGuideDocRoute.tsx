import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/ReferenceApiGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const referenceApiGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/référence-api",
    beforeLoad: () => ({
        title: "Référence API",
        description: "Conventions, codes d'erreur et catalogue des endpoints de l'API Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
