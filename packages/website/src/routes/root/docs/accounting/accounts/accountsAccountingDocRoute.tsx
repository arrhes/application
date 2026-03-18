import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/accountsAccountingDocPage.tsx"),
        "AccountsAccountingDocPage",
    ),
})
