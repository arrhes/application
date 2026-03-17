import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountDetailAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/$account",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/accounts/accountDetailPage.tsx"),
        "AccountDetailPage",
    ),
})
