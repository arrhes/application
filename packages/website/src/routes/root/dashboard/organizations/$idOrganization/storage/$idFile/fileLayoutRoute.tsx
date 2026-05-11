import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { storageLayoutRoute } from "../storageLayoutRoute.js"

export const fileLayoutRoute = createRoute({
    getParentRoute: () => storageLayoutRoute,
    path: "/$idFile",
    beforeLoad: () => ({
        title: "Pièce justificative",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../features/dashboard/$idYear/files/$idFile/fileLayout.js"),
        "FileLayout",
    ),
})
