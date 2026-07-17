import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { reportsAccountingDocLayoutRoute } from "./reportsAccountingDocLayoutRoute.js"
import { FecAccountingDocPage } from "../../../../../features/docs/accounting/reports/FecAccountingDocPage.js"


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
            <FecAccountingDocPage />
        </DocRoot>
    ),
})
