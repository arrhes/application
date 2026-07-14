import { createRoute } from "@tanstack/react-router"
import { OrgUsersApiDocPage } from "../../../../features/docs/api/OrgUsersApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const membresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Gestion des membres d'une organisation : invitation, rôles et suppression.",
    }),
    component: OrgUsersApiDocPage,
})
