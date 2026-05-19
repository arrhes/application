import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const rootApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "API",
        description:
            "Documentation de l'API Arrhes : endpoints REST pour intégrer la comptabilité dans vos applications.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/RootApiDocPage.tsx"), "RootApiDocPage"),
})
