import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const introductionApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/introductionApiDocPage.tsx"),
        "IntroductionApiDocPage",
    ),
})
