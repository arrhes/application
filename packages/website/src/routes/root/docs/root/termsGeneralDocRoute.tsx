import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const termsGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/termsGeneralDocPage.tsx"),
        "TermsGeneralDocPage",
    ),
})
