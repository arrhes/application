import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import Content from "../../../../../../features/docs/accounting/resources/glossary/GlossaryTermResourcesAccountingDocPage.mdx"
import { getGlossaryTermBySlug } from "../../../../../../features/docs/accounting/resources/glossary/glossaryData.js"
import { glossaryAccountingDocLayoutRoute } from "./glossaryAccountingDocLayoutRoute.js"

export const glossaryTermAccountingDocRoute = createRoute({
    getParentRoute: () => glossaryAccountingDocLayoutRoute,
    path: "/$term",
    beforeLoad: ({ params }) => {
        const entry = getGlossaryTermBySlug(params.term)
        return {
            title: entry ? `${entry.term} - Glossaire comptable` : "Glossaire comptable",
            description: entry
                ? `Définition de « ${entry.term} » : ${entry.definition.slice(0, 140)}${entry.definition.length > 140 ? "…" : ""}`
                : "Terme comptable introuvable dans le glossaire.",
        }
    },
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
