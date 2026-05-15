import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
        description:
            "Besoin d'aide avec Arrhes ? Contactez notre support ou consultez la documentation pour résoudre vos problèmes.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/SupportGeneralDocPage.tsx"),
        "SupportGeneralDocPage",
    ),
})
