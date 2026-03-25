import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { tagsLayoutRoute } from "../tagsLayoutRoute.js"

export const tagLayoutRoute = createRoute({
    getParentRoute: () => tagsLayoutRoute,
    path: "/$idTag",
    beforeLoad: () => ({
        title: "Catégorie",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../../features/dashboard/$idYear/yearSettings/tags/$idTag/tagLayout.js"),
        "TagLayout",
    ),
})
