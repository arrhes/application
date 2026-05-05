import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "../balanceSheetsLayoutRoute.js"

export const balanceSheetLayoutRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/$idBalanceSheet",
    beforeLoad: () => ({
        title: "Ligne de bilan",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayout.js"
            ),
        "BalanceSheetLayout",
    ),
})
