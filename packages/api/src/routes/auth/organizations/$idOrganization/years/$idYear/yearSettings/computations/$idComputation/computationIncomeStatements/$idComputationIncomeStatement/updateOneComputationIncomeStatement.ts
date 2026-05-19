import { models, updateOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneComputationIncomeStatementRoute = apiFactory
    .createApp()
    .post(updateOneComputationIncomeStatementRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneComputationIncomeStatementRouteDefinition.schemas.body,
        })

        const updateOneComputationIncomeStatement = await updateOne({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            data: {
                idComputation: body.idComputation,
                idIncomeStatement: body.idIncomeStatement,
                operation: body.operation,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idComputationIncomeStatement),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneComputationIncomeStatementRouteDefinition.schemas.return,
            data: updateOneComputationIncomeStatement,
        })
    })
