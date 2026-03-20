import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const pricingGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/tarifs",
    beforeLoad: () => ({
        title: "Tarifs",
        description:
            "Consultez les tarifs d'Arrhes. Plan basique gratuit et plan avancé avec fonctionnalités étendues pour les entreprises et associations.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/pricing/pricingGeneralDocPage.tsx"),
        "PricingGeneralDocPage",
    ),
})
