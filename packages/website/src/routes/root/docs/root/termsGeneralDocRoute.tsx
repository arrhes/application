import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const termsGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
        description:
            "Conditions Générales d'Utilisation d'Arrhes. Consultez les règles et conditions d'utilisation du logiciel.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/termsGeneralDocPage.tsx"),
        "TermsGeneralDocPage",
    ),
})
