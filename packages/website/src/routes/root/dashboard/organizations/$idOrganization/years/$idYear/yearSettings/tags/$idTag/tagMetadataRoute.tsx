import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { tagLayoutRoute } from "./tagLayoutRoute.js"

export const tagMetadataRoute = createRoute({
    getParentRoute: () => tagLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/tags/$idTag/TagMetadataTab.js"
            ),
        "TagMetadataTab",
    ),
})
