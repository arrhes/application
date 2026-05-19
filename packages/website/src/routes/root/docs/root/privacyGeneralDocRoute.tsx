import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Politique de confidentialité",
        description:
            "Politique de confidentialité d'Arrhes. Découvrez comment nous protégeons vos données personnelles et comptables.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/PrivacyGeneralDocPage.tsx"),
        "PrivacyGeneralDocPage",
    ),
})
