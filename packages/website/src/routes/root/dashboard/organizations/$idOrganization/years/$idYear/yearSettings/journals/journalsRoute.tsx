import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { journalsLayoutRoute } from "./journalsLayoutRoute.js"

export const journalsRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/journalsPage.js"),
        "JournalsPage",
    ),
})
