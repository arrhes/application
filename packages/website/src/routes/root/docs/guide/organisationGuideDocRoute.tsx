import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyOrganisationGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/OrganisationGuideDocPage.tsx"),
)

export const organisationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description: "Gérez vos organisations Arrhes : création, paramètres, membres et suppression.",
    }),
    component: () => (
        <DocRoot>
            <LazyOrganisationGuideDocPage />
        </DocRoot>
    ),
})
