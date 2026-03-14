import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { settingsLayoutRoute } from "./settingsLayoutRoute.js"

export const settingsRoute = createRoute({
    getParentRoute: () => settingsLayoutRoute,
    path: "/",
    beforeLoad: () => {},
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/settings/settingsPage.js"),
        "SettingsPage",
    ),
})
