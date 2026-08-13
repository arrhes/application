import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { RootAccountingDocPage } from "../../../../features/docs/accounting/RootAccountingDocPage.js"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
        description:
            "Cours de comptabilité française complet : partie double, écritures, comptes, documents de synthèse et glossaire.",
    }),
    component: () => (
        <DocRoot>
            <RootAccountingDocPage />
        </DocRoot>
    ),
})
