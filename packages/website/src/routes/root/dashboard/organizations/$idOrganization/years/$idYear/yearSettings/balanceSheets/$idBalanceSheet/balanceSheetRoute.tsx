import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { balanceSheetLayoutRoute } from "./balanceSheetLayoutRoute.js"

export const balanceSheetRoute = createRoute({
    getParentRoute: () => balanceSheetLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetPage.js"
            ),
        "BalanceSheetPage",
    ),
})
