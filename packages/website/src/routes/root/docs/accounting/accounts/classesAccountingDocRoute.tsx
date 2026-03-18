import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

export const classesAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/classes",
    beforeLoad: () => ({
        title: "Classes de comptes",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/accounts/classesAccountingDocPage.tsx"),
        "ClassesAccountingDocPage",
    ),
})
