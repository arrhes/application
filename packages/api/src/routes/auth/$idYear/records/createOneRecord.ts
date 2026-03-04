import { createOneRecordRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneRecordRoute = apiFactory.createApp().post(createOneRecordRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneRecordRouteDefinition.schemas.body,
    })

    const createOneRecord = await insertOne({
        database: c.var.clients.sql,
        table: models.record,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idJournal: body.idJournal,
            idFile: body.idFile,
            label: body.label,
            date: body.date,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneRecordRouteDefinition.schemas.return,
        data: createOneRecord,
    })
})
