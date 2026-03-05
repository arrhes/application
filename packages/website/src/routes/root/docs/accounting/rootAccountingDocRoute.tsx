import { createRoute } from "@tanstack/react-router"
import { RootAccountingDocPage } from "../../../../features/docs/accounting/rootAccountingDocPage.js"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
    }),
    component: () => <RootAccountingDocPage />,
})
