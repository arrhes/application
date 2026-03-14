import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Politique de confidentialité",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/privacyGeneralDocPage.tsx"),
        "PrivacyGeneralDocPage",
    ),
})
