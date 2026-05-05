import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { fileLayoutRoute } from "./fileLayoutRoute.js"

export const fileVisualisationRoute = createRoute({
    getParentRoute: () => fileLayoutRoute,
    path: "/visualisation",
    beforeLoad: () => ({
        title: "Visualisation",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/files/$idFile/fileVisualisationTab.js"),
        "FileVisualisationTab",
    ),
})
