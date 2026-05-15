import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLayoutRoute } from "./entryLayoutRoute.js"

export const entryLinesRoute = createRoute({
    getParentRoute: () => entryLayoutRoute,
    path: "/mouvements",
    beforeLoad: () => ({
        title: "Mouvements",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/EntryLinesTab.js"),
        "EntryLinesTab",
    ),
})
