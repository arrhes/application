import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { fileLayoutRoute } from "./fileLayoutRoute.js"

export const fileRoute = createRoute({
    getParentRoute: () => fileLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/files/$idFile/filePage.js"),
        "FilePage",
    ),
})
