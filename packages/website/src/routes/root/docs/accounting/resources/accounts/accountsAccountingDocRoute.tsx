import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import Content from "../../../../../../features/docs/accounting/resources/accounts/AccountsResourcesAccountingDocPage.mdx"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Plan comptable",
        description:
            "Liste complète des comptes du plan comptable général français. Recherchez et consultez les comptes par numéro ou libellé.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
