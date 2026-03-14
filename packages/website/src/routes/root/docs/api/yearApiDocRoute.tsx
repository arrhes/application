import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const yearApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/exercice",
    beforeLoad: () => ({
        title: "Exercice",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/yearApiDocPage.tsx"), "YearApiDocPage"),
})
