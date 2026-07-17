import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"
import { DoubleEntryAccountingDocPage } from "../../../../../features/docs/accounting/introduction/DoubleEntryAccountingDocPage.js"


export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/partie-double",
    beforeLoad: () => ({
        title: "La partie double",
        description:
            "Comprendre le principe de la partie double en comptabilité : chaque opération génère au moins un débit et un crédit.",
    }),
    component: () => (
        <DocRoot>
            <DoubleEntryAccountingDocPage />
        </DocRoot>
    ),
})
