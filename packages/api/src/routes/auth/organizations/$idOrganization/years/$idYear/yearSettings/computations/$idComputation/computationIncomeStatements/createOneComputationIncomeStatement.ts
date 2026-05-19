import { createOneComputationIncomeStatementRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../../../utilities/sql/insertOne.js"

export const createOneComputationIncomeStatementRoute = apiFactory
    .createApp()
    .post(createOneComputationIncomeStatementRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneComputationIncomeStatementRouteDefinition.schemas.body,
        })

        const createOneComputationIncomeStatement = await insertOne({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                idComputation: body.idComputation,
                idIncomeStatement: body.idIncomeStatement,
                operation: body.operation,
                index: body.index,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: auth.user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneComputationIncomeStatementRouteDefinition.schemas.return,
            data: createOneComputationIncomeStatement,
        })
    })
