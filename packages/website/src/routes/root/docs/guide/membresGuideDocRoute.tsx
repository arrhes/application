import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { OrganizationMembersGuideDocPage } from "../../../../features/docs/guide/organizations/OrganizationMembersGuideDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const membresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Gestion des membres d'une organisation : invitation, rôles et suppression.",
    }),
    component: () => (
        <DocRoot>
            <OrganizationMembersGuideDocPage />
        </DocRoot>
    ),
})
