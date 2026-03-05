import { createOneFileRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneFileRoute = apiFactory.createApp().post(createOneFileRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFileRouteDefinition.schemas.body,
    })

    const createOneFile = await insertOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idFolder: body.idFolder ?? null,
            reference: body.reference,
            name: body.name,
            storageKey: null,
            type: null,
            size: null,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFileRouteDefinition.schemas.return,
        data: createOneFile,
    })
})
