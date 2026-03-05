import { deleteOneOrganizationUserRoute } from "./deleteOneOrganizationUser.js"
import { readOneOrganizationUserRoute } from "./readOneOrganizationUser.js"
import { updateOneOrganizationUserRoute } from "./updateOneOrganizationUser.js"

export const $idOrganizationUserRoutes = [
    deleteOneOrganizationUserRoute,
    readOneOrganizationUserRoute,
    updateOneOrganizationUserRoute,
]
