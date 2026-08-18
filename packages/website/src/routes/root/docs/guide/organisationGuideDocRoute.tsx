import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { OrganizationsGuideDocPage } from "../../../../features/docs/guide/organizations/OrganizationsGuideDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const organisationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description: "Gérez vos organisations Comptasse : création, paramètres, membres et suppression.",
    }),
    component: () => (
        <DocRoot>
            <OrganizationsGuideDocPage />
        </DocRoot>
    ),
})
