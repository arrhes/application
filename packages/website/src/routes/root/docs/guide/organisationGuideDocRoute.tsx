import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { OrganisationGuideDocPage } from "../../../../features/docs/guide/OrganisationGuideDocPage.tsx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const organisationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description: "Gérez vos organisations Arrhes : création, paramètres, membres et suppression.",
    }),
    component: () => (
        <DocRoot>
            <OrganisationGuideDocPage />
        </DocRoot>
    ),
})
