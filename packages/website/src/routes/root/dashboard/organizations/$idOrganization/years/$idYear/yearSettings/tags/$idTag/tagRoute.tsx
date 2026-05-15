import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { tagLayoutRoute } from "./tagLayoutRoute.js"

export const tagRoute = createRoute({
    getParentRoute: () => tagLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../../features/dashboard/$idYear/yearSettings/tags/$idTag/TagPage.js"),
        "TagPage",
    ),
})
