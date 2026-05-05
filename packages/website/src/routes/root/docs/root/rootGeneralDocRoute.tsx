import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation",
        description:
            "Documentation complète d'Arrhes : guide d'utilisation, cours de comptabilité, référence API et informations générales.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/rootGeneralDocPage.tsx"),
        "RootGeneralDocPage",
    ),
})
