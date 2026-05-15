import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { balanceSheetLayoutRoute } from "./balanceSheetLayoutRoute.js"

export const balanceSheetMetadataRoute = createRoute({
    getParentRoute: () => balanceSheetLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/balanceSheets/$idBalanceSheet/BalanceSheetMetadataTab.js"
            ),
        "BalanceSheetMetadataTab",
    ),
})
