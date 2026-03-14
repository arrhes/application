import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/legalGeneralDocPage.tsx"),
        "LegalGeneralDocPage",
    ),
})
