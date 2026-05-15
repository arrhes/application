import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { actifLayoutRoute } from "./actifLayoutRoute.js"

export const actifRoute = createRoute({
    getParentRoute: () => actifLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/BalanceSheetsPage.js"
            ),
        "BalanceSheetsPage",
    ),
})
