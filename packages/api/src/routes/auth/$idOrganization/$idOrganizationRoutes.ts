import { filesRoutes } from "../$idYear/files/filesRoutes.js"
import { foldersRoutes } from "../$idYear/folders/foldersRoutes.js"
import { apiKeyRoutes } from "./apiKey/apiKeyRoutes.js"
import { organizationPaymentsRoutes } from "./organizationPayment/organizationPaymentsRoutes.js"
import { organizationSettingsRoutes } from "./organizationSettings/organizationSettingsRoutes.js"
import { organizationUsersRoutes } from "./organizationUser/organizationUsersRoutes.js"
import { readOneOrganizationRoute } from "./readOneOrganization.js"
import { yearsRoutes } from "./years/yearsRoutes.js"

export const $idOrganizationRoutes = [
    readOneOrganizationRoute,

    ...yearsRoutes,
    ...organizationUsersRoutes,
    ...organizationSettingsRoutes,
    ...organizationPaymentsRoutes,
    ...apiKeyRoutes,
    ...filesRoutes,
    ...foldersRoutes,
]
