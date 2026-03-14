import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/rootGeneralDocPage.tsx"),
        "RootGeneralDocPage",
    ),
})
