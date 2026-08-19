import { deleteOneOrganizationRoute } from "./deleteOneOrganization.js"
import { updateOrganizationStorageCredentialsRoute } from "./storage/updateOrganizationStorageCredentials.js"
import { updateOneOrganizationRoute } from "./updateOneOrganization.js"

export const organizationSettingsRoutes = [
    deleteOneOrganizationRoute,
    updateOneOrganizationRoute,
    updateOrganizationStorageCredentialsRoute,
]
