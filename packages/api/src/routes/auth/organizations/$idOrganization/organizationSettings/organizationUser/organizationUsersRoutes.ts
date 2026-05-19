import { createOneOrganizationUserRoute } from "./createOneOrganizationUser.js"
import { deleteOneOrganizationUserRoute } from "./deleteOneOrganizationUser.js"
import { readAllOrganizationUsersRoute } from "./readAllOrganizationUsers.js"
import { readOneOrganizationUserRoute } from "./readOneOrganizationUser.js"
import { updateOneOrganizationUserRoute } from "./updateOneOrganizationUser.js"

export const organizationUsersRoutes = [
    createOneOrganizationUserRoute,
    readAllOrganizationUsersRoute,
    deleteOneOrganizationUserRoute,
    readOneOrganizationUserRoute,
    updateOneOrganizationUserRoute,
]
