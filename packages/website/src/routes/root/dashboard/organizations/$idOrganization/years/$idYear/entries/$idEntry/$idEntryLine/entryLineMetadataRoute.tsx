import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLineLayoutRoute } from "./entryLineLayoutRoute.js"

export const entryLineMetadataRoute = createRoute({
    getParentRoute: () => entryLineLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/$idEntryLine/EntryLineMetadataTab.js"
            ),
        "EntryLineMetadataTab",
    ),
})
