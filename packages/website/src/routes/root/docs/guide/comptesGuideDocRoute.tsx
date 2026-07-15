import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/ComptesGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const comptesGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description: "Plan comptable de l'exercice : création, modification et suppression des comptes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
