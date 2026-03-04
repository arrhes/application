import { $idOrganizationRoutes } from "../../../routes/auth/$idOrganization/$idOrganizationRoutes.js"
import { activateOrganizationMembershipRoute } from "../../../routes/auth/organizations/activateOrganizationMembership.js"
import { addNewOrganizationRoute } from "../../../routes/auth/organizations/addNewOrganization.js"
import { getAllMyOrganizationsRoute } from "../../../routes/auth/organizations/getAllMyOrganizations.js"

export const organizationsRoutes = [
    activateOrganizationMembershipRoute,
    addNewOrganizationRoute,
    getAllMyOrganizationsRoute,

    ...$idOrganizationRoutes,
]
