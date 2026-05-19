import { models, updateOneFolderRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const updateOneFolderRoute = registerRoute(updateOneFolderRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneFolderRouteDefinition.schemas.body,
    })

    const updateOneFolder = await updateOne({
        database: c.var.clients.sql,
        table: models.folder,
        data: {
            name: body.name,
            idFolderParent: body.idFolderParent,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: auth.user.id,
        },
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFolder)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneFolderRouteDefinition.schemas.return,
        data: updateOneFolder,
    })
})
