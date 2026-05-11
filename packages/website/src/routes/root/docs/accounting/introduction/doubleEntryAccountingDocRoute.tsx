import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
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
