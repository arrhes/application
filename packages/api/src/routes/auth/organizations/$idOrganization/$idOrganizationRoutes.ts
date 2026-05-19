import { apiKeyRoutes } from "./organizationSettings/apiKey/apiKeyRoutes.js"
import { organizationPaymentsRoutes } from "./organizationSettings/organizationPayment/organizationPaymentsRoutes.js"
import { organizationSettingsRoutes } from "./organizationSettings/organizationSettingsRoutes.js"
import { organizationUsersRoutes } from "./organizationSettings/organizationUser/organizationUsersRoutes.js"
import { readOneOrganizationRoute } from "./readOneOrganization.js"
import { yearsRoutes } from "./years/yearsRoutes.js"

export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...yearsRoutes,
    ...organizationUsersRoutes,
    ...organizationSettingsRoutes,
    ...organizationPaymentsRoutes,
    ...apiKeyRoutes,
]
