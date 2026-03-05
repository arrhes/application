import { createOneComputationRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneComputationRoute = apiFactory
    .createApp()
    .post(createOneComputationRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneComputationRouteDefinition.schemas.body,
        })

        const createOneComputation = await insertOne({
            database: c.var.clients.sql,
            table: models.computation,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                index: body.index,
                number: body.number,
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
            schema: createOneComputationRouteDefinition.schemas.return,
            data: createOneComputation,
        })
    })
