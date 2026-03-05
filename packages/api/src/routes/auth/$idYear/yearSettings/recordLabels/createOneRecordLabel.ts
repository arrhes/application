import { createOneRecordLabelRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneRecordLabelRoute = apiFactory
    .createApp()
    .post(createOneRecordLabelRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneRecordLabelRouteDefinition.schemas.body,
        })

        const createOneRecordLabel = await insertOne({
            database: c.var.clients.sql,
            table: models.recordLabel,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,

                label: body.label,

                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneRecordLabelRouteDefinition.schemas.return,
            data: createOneRecordLabel,
        })
    })
