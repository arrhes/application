import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { getAccountBySlug } from "../../../../../features/docs/accounting/accounts/accountsData.js"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.tsx"

export const accountAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/liste/$account",
    beforeLoad: ({ params }) => {
        const entry = getAccountBySlug(params.account)
        return {
            title: entry ? `Compte ${entry.number} - ${entry.label}` : "Compte introuvable",
            description: entry
                ? `Fiche du compte ${entry.number} (${entry.label}) : fonctionnement débit/crédit, exemples d'écritures et cas pratiques.`
                : "Ce compte comptable n'a pas été trouvé dans le plan comptable général.",
        }
    },
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountAccountingDocPage.tsx"),
        "AccountAccountingDocPage",
    ),
})
