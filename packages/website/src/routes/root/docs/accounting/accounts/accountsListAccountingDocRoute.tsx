import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsListAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/liste",
    beforeLoad: () => ({
        title: "Plan comptable",
        description:
            "Liste complète des comptes du plan comptable général français. Recherchez et consultez les comptes par numéro ou libellé.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountsListAccountingDocPage.tsx"),
        "AccountsListAccountingDocPage",
    ),
})
