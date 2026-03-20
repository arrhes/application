import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "../accountingDocLayoutRoute.js"

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
        description:
            "Cours de comptabilité française complet : partie double, écritures, comptes, documents de synthèse et glossaire.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/rootAccountingDocPage.js"),
        "RootAccountingDocPage",
    ),
})
