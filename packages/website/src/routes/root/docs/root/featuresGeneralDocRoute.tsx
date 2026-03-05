import { createRoute } from "@tanstack/react-router"
import { FeaturesGeneralDocPage } from "../../../../features/docs/general/features/featuresGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const featuresGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/fonctionnalités",
    beforeLoad: () => ({
        title: "Fonctionnalités",
    }),
    component: () => <FeaturesGeneralDocPage />,
})
