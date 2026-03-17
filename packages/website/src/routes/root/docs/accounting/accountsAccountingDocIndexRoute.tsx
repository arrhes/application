import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsAccountingDocIndexRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/accounts/accountsIndexPage.tsx"),
        "AccountsIndexPage",
    ),
})
