import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsLayoutRoute } from "../accountsLayoutRoute.js"

export const accountLayoutRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/$idAccount",
    beforeLoad: () => ({
        title: "Compte",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/accounts/$idAccount/AccountLayout.js"
            ),
        "AccountLayout",
    ),
})
