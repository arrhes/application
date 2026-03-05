import { createRoute } from "@tanstack/react-router"
import { PricingGeneralDocPage } from "../../../../features/docs/general/pricing/pricingGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const pricingGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/tarifs",
    beforeLoad: () => ({
        title: "Tarifs",
    }),
    component: () => <PricingGeneralDocPage />,
})
