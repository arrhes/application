import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { passifLayoutRoute } from "./passifLayoutRoute.js"

export const passifRoute = createRoute({
    getParentRoute: () => passifLayoutRoute,
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
