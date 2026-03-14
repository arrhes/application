import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const pricingGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/tarifs",
    beforeLoad: () => ({
        title: "Tarifs",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/pricing/pricingGeneralDocPage.tsx"),
        "PricingGeneralDocPage",
    ),
})
