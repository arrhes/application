import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountsLayoutRoute } from "./accountsLayoutRoute.js"

export const accountsRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/yearSettings/accounts/accountsPage.js"),
        "AccountsPage",
    ),
})
