import { models, readAllOrganizationUsersRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readAllOrganizationUsersRoute = apiFactory
    .createApp()
    .get(readAllOrganizationUsersRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readAllOrganizationUsersRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        const readAllOrganizationUsers = await c.var.clients.sql.query.organizationUserModel.findMany({
            where: (table) => and(eq(table.idOrganization, organizationUser.idOrganization)),
            with: {
                user: true,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllOrganizationUsersRouteDefinition.schemas.return,
            data: readAllOrganizationUsers,
        })
    })
