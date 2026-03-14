import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { balanceSheetsLayoutRoute } from "./balanceSheetsLayoutRoute.js"

export const balanceSheetsRoute = createRoute({
    getParentRoute: () => balanceSheetsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/balanceSheetsPage.js"
            ),
        "BalanceSheetsPage",
    ),
})
