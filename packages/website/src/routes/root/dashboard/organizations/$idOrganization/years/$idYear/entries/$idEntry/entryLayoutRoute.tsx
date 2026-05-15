import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entriesLayoutRoute } from "../entriesLayoutRoute.js"

export const entryLayoutRoute = createRoute({
    getParentRoute: () => entriesLayoutRoute,
    path: "/$idEntry",
    beforeLoad: () => ({
        title: "Écriture",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/EntryLayout.js"),
        "EntryLayout",
    ),
})
