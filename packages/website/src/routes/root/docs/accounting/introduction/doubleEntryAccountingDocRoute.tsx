import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/introduction/DoubleEntryAccountingDocPage.mdx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/partie-double",
    beforeLoad: () => ({
        title: "La partie double",
        description:
            "Comprendre le principe de la partie double en comptabilité : chaque opération génère au moins un débit et un crédit.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
