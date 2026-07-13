import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import Content from "../../../../../../features/docs/accounting/resources/glossary/GlossaryResourcesAccountingDocPage.mdx"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

export const glossaryAccountingDocIndexRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Glossaire comptable",
        description:
            "Glossaire de la comptabilité française : définitions claires des termes comptables essentiels, de A à Z.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
