import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { yearSettingsLayoutRoute } from "./yearSettingsLayoutRoute.js"

export const yearSettingsRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/yearSettings/yearSettingsPage.js"),
        "YearSettingsPage",
    ),
})
