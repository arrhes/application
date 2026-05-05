import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountLayoutRoute } from "./accountLayoutRoute.js"

export const accountMetadataRoute = createRoute({
    getParentRoute: () => accountLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/accounts/$idAccount/accountMetadataTab.js"
            ),
        "AccountMetadataTab",
    ),
})
