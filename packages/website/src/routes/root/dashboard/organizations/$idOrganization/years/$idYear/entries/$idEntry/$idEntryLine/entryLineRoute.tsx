import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLineLayoutRoute } from "./entryLineLayoutRoute.js"

export const entryLineRoute = createRoute({
    getParentRoute: () => entryLineLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/$idEntryLine/EntryLinePage.js"
            ),
        "EntryLinePage",
    ),
})
