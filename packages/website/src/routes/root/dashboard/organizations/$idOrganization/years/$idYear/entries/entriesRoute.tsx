import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entriesLayoutRoute } from "./entriesLayoutRoute.js"

export const entriesRoute = createRoute({
    getParentRoute: () => entriesLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/entries/EntriesPage.js"),
        "EntriesPage",
    ),
})
