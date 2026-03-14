import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { filesLayoutRoute } from "./filesLayoutRoute.js"

export const filesRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "/",
    validateSearch: (search: Record<string, unknown>) => ({
        idFolder: typeof search.idFolder === "string" ? search.idFolder : undefined,
    }),
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../../../features/dashboard/$idYear/files/filesPage.js"),
        "FilesPage",
    ),
})
