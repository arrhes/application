import { $idOrganizationRoutes } from "./$idOrganization/$idOrganizationRoutes.js"
import { activateOrganizationMembershipRoute } from "./activateOrganizationMembership.js"
import { addNewOrganizationRoute } from "./addNewOrganization.js"
import { getAllMyOrganizationsRoute } from "./getAllMyOrganizations.js"

export const organizationsRoutes = [
    activateOrganizationMembershipRoute,
    addNewOrganizationRoute,
    getAllMyOrganizationsRoute,

    ...$idOrganizationRoutes,
]
