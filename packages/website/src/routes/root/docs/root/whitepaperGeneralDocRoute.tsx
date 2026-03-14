import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/whitepaperGeneralDocPage.tsx"),
        "WhitepaperGeneralDocPage",
    ),
})
