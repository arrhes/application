import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsListAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/liste",
    beforeLoad: () => ({
        title: "Plan comptable",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountsListAccountingDocPage.tsx"),
        "AccountsListAccountingDocPage",
    ),
})
