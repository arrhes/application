import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/supportGeneralDocPage.tsx"),
        "SupportGeneralDocPage",
    ),
})
