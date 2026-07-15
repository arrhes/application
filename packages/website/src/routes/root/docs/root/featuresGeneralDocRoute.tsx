import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { FeaturesGeneralDocPage } from "../../../../features/docs/general/features/FeaturesGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const featuresGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/fonctionnalités",
    beforeLoad: () => ({
        title: "Fonctionnalités",
        description:
            "Découvrez les fonctionnalités d'Arrhes : saisie d'écritures, plan comptable, documents de synthèse, gestion multi-organisations et plus.",
    }),
    component: () => (
        <DocRoot>
            <FeaturesGeneralDocPage />
        </DocRoot>
    ),
})
