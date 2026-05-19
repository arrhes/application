import { deleteOneApiKeyRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { registerRoute } from "../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const deleteOneApiKeyRoute = registerRoute(deleteOneApiKeyRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneApiKeyRouteDefinition.schemas.body,
    })

    // Must be admin of the organization
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

    const deleteOneApiKey = await deleteOne({
        database: c.var.clients.sql,
        table: models.apiKey,
        where: (table) => and(eq(table.id, body.idApiKey), eq(table.idOrganization, idOrganization)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneApiKeyRouteDefinition.schemas.return,
        data: deleteOneApiKey,
    })
})
