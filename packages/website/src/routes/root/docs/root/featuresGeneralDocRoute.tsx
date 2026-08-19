import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { FeaturesGeneralDocPage } from "../../../../features/docs/project/FeaturesGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const featuresGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/fonctionnalités",
    beforeLoad: () => ({
        title: "Fonctionnalités",
        description:
            "Découvrez les fonctionnalités de Comptasse : saisie d'écritures, plan comptable, documents de synthèse, gestion multi-organisations et plus.",
    }),
    component: () => (
        <DocRoot>
            <FeaturesGeneralDocPage />
        </DocRoot>
    ),
})
