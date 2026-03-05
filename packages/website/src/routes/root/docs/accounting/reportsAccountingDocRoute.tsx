import { createRoute } from "@tanstack/react-router"
import { ReportsAccountingDocPage } from "../../../../features/docs/accounting/reportsAccountingDocPage.tsx"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const reportsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables",
    }),
    component: () => <ReportsAccountingDocPage />,
})
