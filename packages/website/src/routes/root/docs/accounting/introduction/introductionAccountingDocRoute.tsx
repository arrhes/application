import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/introduction/IntroductionAccountingDocPage.mdx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

export const introductionAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Introduction au cours de comptabilité",
        description:
            "Introduction aux fondamentaux de la comptabilité française : principes, obligations légales et concepts de base.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
