import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const compteDeResultatAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/compte-de-resultat",
    beforeLoad: () => ({
        title: "Compte de résultat",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/reports/compteDeResultatPage.tsx"),
        "CompteDeResultatPage",
    ),
})
