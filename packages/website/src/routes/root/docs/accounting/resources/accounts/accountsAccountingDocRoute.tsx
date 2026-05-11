import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Plan comptable",
        description:
            "Liste complète des comptes du plan comptable général français. Recherchez et consultez les comptes par numéro ou libellé.",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../features/docs/accounting/resources/accounts/accountsResourcesAccountingDocPage.tsx"
            ),
        "AccountsResourcesAccountingDocPage",
    ),
})
