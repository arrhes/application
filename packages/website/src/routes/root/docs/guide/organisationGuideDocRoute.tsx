import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { OrganisationGuideDocPage } from "../../../../features/docs/guide/OrganisationGuideDocPage.js"


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
