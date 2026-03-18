import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.tsx"

export const accountAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/liste/$account",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountAccountingDocPage.tsx"),
        "AccountAccountingDocPage",
    ),
})
