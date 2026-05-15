import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entryLayoutRoute } from "./entryLayoutRoute.js"

export const entryMetadataRoute = createRoute({
    getParentRoute: () => entryLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/EntryMetadataTab.js"),
        "EntryMetadataTab",
    ),
})
