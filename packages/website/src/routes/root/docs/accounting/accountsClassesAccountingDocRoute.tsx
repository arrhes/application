import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const accountsClassesAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/classes",
    beforeLoad: () => ({
        title: "Classes de comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/accounts/accountsClassesPage.tsx"),
        "AccountsClassesPage",
    ),
})
