import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { recordLayoutRoute } from "./recordLayoutRoute.js"

export const recordRoute = createRoute({
    getParentRoute: () => recordLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/records/$idRecord/recordPage.js"),
        "RecordPage",
    ),
})
