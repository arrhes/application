import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description:
            "Présentation des comptes comptables : structure, numérotation et fonctionnement du plan comptable général français.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/accountsAccountingDocPage.tsx"),
        "AccountsAccountingDocPage",
    ),
})
