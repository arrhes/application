import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const rootApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "API",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/rootApiDocPage.tsx"), "RootApiDocPage"),
})
