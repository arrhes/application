import { createRoute } from "@tanstack/react-router"
import { RecordsAccountingDocPage } from "../../../../features/docs/accounting/recordsAccountingDocPage.tsx"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.tsx"

export const recordsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Écritures comptables",
    }),
    component: () => <RecordsAccountingDocPage />,
})
