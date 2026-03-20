import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Comptes",
        description:
            "Présentation des comptes comptables : structure, numérotation et fonctionnement du plan comptable général français.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountsAccountingDocPage.tsx"),
        "AccountsAccountingDocPage",
    ),
})
