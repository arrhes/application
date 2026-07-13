import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import Content from "../../../../../../features/docs/accounting/resources/accounts/AccountResourcesAccountingDocPage.mdx"
import { getAccountBySlug } from "../../../../../../features/docs/accounting/resources/accounts/accountsData.ts"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.tsx"

export const accountAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/$account",
    beforeLoad: ({ params }) => {
        const entry = getAccountBySlug(params.account)
        return {
            title: entry ? `Compte ${entry.number} - ${entry.label}` : "Compte introuvable",
            description: entry
                ? `Fiche du compte ${entry.number} (${entry.label}) : fonctionnement débit/crédit, exemples d'écritures et cas pratiques.`
                : "Ce compte comptable n'a pas été trouvé dans le plan comptable général.",
        }
    },
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
