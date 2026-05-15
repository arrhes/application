import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { fileLayoutRoute } from "./fileLayoutRoute.js"

export const fileMetadataRoute = createRoute({
    getParentRoute: () => fileLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../features/dashboard/$idYear/files/$idFile/FileMetadataTab.js"),
        "FileMetadataTab",
    ),
})
