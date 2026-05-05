import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { tagsLayoutRoute } from "./tagsLayoutRoute.js"

export const tagsRoute = createRoute({
    getParentRoute: () => tagsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/yearSettings/tags/tagsPage.js"),
        "TagsPage",
    ),
})
