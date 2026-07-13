import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../components/document/DocRoot"
import Content from "../../../../../features/docs/accounting/introduction/AccountsAccountingDocPage.mdx"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description:
            "Présentation des comptes comptables : structure, numérotation et fonctionnement du plan comptable général français.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
