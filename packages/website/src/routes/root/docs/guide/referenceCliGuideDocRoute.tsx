import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/ReferenceCliGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const referenceCliGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/référence-cli",
    beforeLoad: () => ({
        title: "Référence CLI",
        description: "Tableau récapitulatif des commandes du CLI Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
