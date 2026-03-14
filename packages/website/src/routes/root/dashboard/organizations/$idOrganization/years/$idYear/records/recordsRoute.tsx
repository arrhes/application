import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { recordsLayoutRoute } from "./recordsLayoutRoute.js"

export const recordsRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/records/recordsPage.js"),
        "RecordsPage",
    ),
})
