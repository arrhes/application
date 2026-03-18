import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.js"

export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/partie-double",
    beforeLoad: () => ({
        title: "La partie double",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/doubleEntryAccountingDocPage.js"),
        "DoubleEntryAccountingDocPage",
    ),
})
