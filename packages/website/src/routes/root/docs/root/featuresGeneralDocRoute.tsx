import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

const LazyFeaturesGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/features/FeaturesGeneralDocPage.tsx"),
)

export const featuresGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/fonctionnalités",
    beforeLoad: () => ({
        title: "Fonctionnalités",
        description:
            "Découvrez les fonctionnalités d'Arrhes : saisie d'écritures, plan comptable, documents de synthèse, gestion multi-organisations et plus.",
    }),
    component: () => (
        <DocRoot>
            <LazyFeaturesGeneralDocPage />
        </DocRoot>
    ),
})
