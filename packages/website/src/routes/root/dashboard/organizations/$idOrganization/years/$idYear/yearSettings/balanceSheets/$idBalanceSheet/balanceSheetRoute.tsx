import { createRoute } from "@tanstack/react-router"
import { BalanceSheetPage } from "../../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetPage.js"
import { balanceSheetLayoutRoute } from "./balanceSheetLayoutRoute.js"

export const balanceSheetRoute = createRoute({
    getParentRoute: () => balanceSheetLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <BalanceSheetPage />,
})
