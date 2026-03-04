import { models, readAllApiKeysRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readAllApiKeysRoute = apiFactory.createApp().post(readAllApiKeysRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const _body = await validateBodyMiddleware({
        context: c,
        schema: readAllApiKeysRouteDefinition.schemas.body,
    })

    // Must be admin of the organization
    const organizationUser = await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
    })
    if (organizationUser.isAdmin === false) {
        throw new Exception({
            statusCode: 401,
            internalMessage: "User is not admin of the organization",
            externalMessage: "Vous n'êtes pas administrateur de l'organisation",
        })
    }

    const readAllApiKeys = await c.var.clients.sql.query.apiKeyModel.findMany({
        where: (table) => and(eq(table.idOrganization, idOrganization)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllApiKeysRouteDefinition.schemas.return,
        data: readAllApiKeys,
    })
})
