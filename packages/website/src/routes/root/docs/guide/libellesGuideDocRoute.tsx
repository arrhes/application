import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/LibellesGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const libellesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Libellés d'écriture réutilisables : création, modification et suppression.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
