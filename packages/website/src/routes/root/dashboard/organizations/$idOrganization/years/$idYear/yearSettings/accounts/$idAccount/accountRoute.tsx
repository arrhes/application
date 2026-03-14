import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountLayoutRoute } from "./accountLayoutRoute.js"

export const accountRoute = createRoute({
    getParentRoute: () => accountLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/accounts/$idAccount/accountPage.js"
            ),
        "AccountPage",
    ),
})
