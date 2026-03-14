import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/accountsAccountingDocPage.tsx"),
        "AccountsAccountingDocPage",
    ),
})
