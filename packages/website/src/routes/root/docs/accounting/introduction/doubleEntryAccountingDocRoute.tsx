import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.js"

export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/partie-double",
    beforeLoad: () => ({
        title: "La partie double",
        description:
            "Comprendre le principe de la partie double en comptabilité : chaque opération génère au moins un débit et un crédit.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/doubleEntryAccountingDocPage.js"),
        "DoubleEntryAccountingDocPage",
    ),
})
