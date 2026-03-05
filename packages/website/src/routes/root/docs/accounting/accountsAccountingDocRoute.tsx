import { createRoute } from "@tanstack/react-router"
import { AccountsAccountingDocPage } from "../../../../features/docs/accounting/accountsAccountingDocPage.tsx"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
    }),
    component: () => <AccountsAccountingDocPage />,
})
