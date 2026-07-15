import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"

const LazyFecAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/reports/FecAccountingDocPage.tsx"),
)

export const fecAccountingDocRoute = createRoute({
    getParentRoute: () => reportsAccountingDocLayoutRoute,
    path: "/fec",
    beforeLoad: () => ({
        title: "Fichier des Écritures Comptables (FEC)",
        description:
            "Le FEC : fichier normé des écritures comptables requis par l'administration fiscale lors d'un contrôle.",
    }),
    component: () => (
        <DocRoot>
            <LazyFecAccountingDocPage />
        </DocRoot>
    ),
})
