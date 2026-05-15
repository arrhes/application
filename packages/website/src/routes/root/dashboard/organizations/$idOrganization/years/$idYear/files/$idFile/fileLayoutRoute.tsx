import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { filesLayoutRoute } from "../filesLayoutRoute.js"

export const fileLayoutRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "/$idFile",
    beforeLoad: () => ({
        title: "Pièce justificative",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../../features/dashboard/$idYear/files/$idFile/FileLayout.js"),
        "FileLayout",
    ),
})
