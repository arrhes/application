import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const yearSettingsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/yearSettings/yearSettingsLayout.js"),
        "YearSettingsLayout",
    ),
})
