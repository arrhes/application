import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

export const fecAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/fec",
    beforeLoad: () => ({
        title: "Fichier des Écritures Comptables (FEC)",
        description:
            "Le FEC : fichier normé des écritures comptables requis par l'administration fiscale lors d'un contrôle.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/reports/fecAccountingDocPage.tsx"),
        "FecAccountingDocPage",
    ),
})
