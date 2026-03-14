import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const filesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Fichiers et documents",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/filesApiDocPage.tsx"), "FilesApiDocPage"),
})
