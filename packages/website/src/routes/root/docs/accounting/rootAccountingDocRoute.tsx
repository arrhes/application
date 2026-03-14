import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/rootAccountingDocPage.js"),
        "RootAccountingDocPage",
    ),
})
