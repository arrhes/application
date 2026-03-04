import { createOneFolderRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneFolderRoute = apiFactory.createApp().post(createOneFolderRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFolderRouteDefinition.schemas.body,
    })

    const createOneFolder = await insertOne({
        database: c.var.clients.sql,
        table: models.folder,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idFolderParent: body.idFolderParent ?? null,
            name: body.name,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFolderRouteDefinition.schemas.return,
        data: createOneFolder,
    })
})
