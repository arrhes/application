import { $idOrganizationUserRoutes } from "./$idOrganizationUser/$idOrganizationUserRoutes.js"
import { createOneOrganizationUserRoute } from "./createOneOrganizationUser.js"
import { readAllOrganizationUsersRoute } from "./readAllOrganizationUsers.js"

export const organizationUsersRoutes = [
    createOneOrganizationUserRoute,
    readAllOrganizationUsersRoute,

    ...$idOrganizationUserRoutes,
]
