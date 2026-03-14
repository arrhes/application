import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const featuresGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/fonctionnalités",
    beforeLoad: () => ({
        title: "Fonctionnalités",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/features/featuresGeneralDocPage.tsx"),
        "FeaturesGeneralDocPage",
    ),
})
