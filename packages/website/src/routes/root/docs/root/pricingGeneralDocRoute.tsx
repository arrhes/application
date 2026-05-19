import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const pricingGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/tarifs",
    beforeLoad: () => ({
        title: "Tarifs",
        description:
            "Consultez les tarifs d'Arrhes. Plan basique gratuit et services payants optionnels (licence, stockage, OCR et tokens IA).",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/pricing/PricingGeneralDocPage.tsx"),
        "PricingGeneralDocPage",
    ),
})
