import { models, updateOneFolderRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const updateOneFolderRoute = apiFactory.createApp().post(updateOneFolderRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
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
            lastUpdatedBy: user.id,
        },
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idFolder)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneFolderRouteDefinition.schemas.return,
        data: updateOneFolder,
    })
})
