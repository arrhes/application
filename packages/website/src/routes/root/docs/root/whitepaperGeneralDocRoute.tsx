import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
        description:
            "La philosophie d'Arrhes : transparence, open source et accessibilité pour la comptabilité des entreprises et associations.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/whitepaperGeneralDocPage.tsx"),
        "WhitepaperGeneralDocPage",
    ),
})
