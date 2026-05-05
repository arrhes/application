import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLayoutRoute } from "./entryLayoutRoute.js"

export const entryCategoriesRoute = createRoute({
    getParentRoute: () => entryLayoutRoute,
    path: "/catégories",
    beforeLoad: () => ({
        title: "Catégories",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/entryCategoriesTab.js"),
        "EntryCategoriesTab",
    ),
})
