import { createRoute } from "@tanstack/react-router"
import { GlossaryAccountingDocPage } from "../../../../features/docs/accounting/glossaryAccountingDocPage.tsx"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const glossaryAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/glossaire",
    beforeLoad: () => ({
        title: "Glossaire comptable",
    }),
    component: () => <GlossaryAccountingDocPage />,
})
