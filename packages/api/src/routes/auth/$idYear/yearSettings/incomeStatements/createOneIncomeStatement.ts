import { createOneIncomeStatementRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneIncomeStatementRoute = apiFactory
    .createApp()
    .post(createOneIncomeStatementRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneIncomeStatementRouteDefinition.schemas.body,
        })

        const createOneIncomeStatement = await insertOne({
            database: c.var.clients.sql,
            table: models.incomeStatement,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                idIncomeStatementParent: body.idIncomeStatementParent,
                isDefault: false,
                isComputed: body.isComputed,
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
            schema: createOneIncomeStatementRouteDefinition.schemas.return,
            data: createOneIncomeStatement,
        })
    })
