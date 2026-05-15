import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLayoutRoute } from "./entryLayoutRoute.js"

export const entryRoute = createRoute({
    getParentRoute: () => entryLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/EntryRoutePage.js"),
        "EntryRoutePage",
    ),
})
