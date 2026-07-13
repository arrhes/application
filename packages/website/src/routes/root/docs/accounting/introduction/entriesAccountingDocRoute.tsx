import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/introduction/EntriesAccountingDocPage.mdx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"

export const entriesAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures comptables",
        description:
            "Apprenez à passer des écritures comptables : lignes de débit et crédit, pièces justificatives et enregistrement des opérations.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
