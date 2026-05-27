import { models, readAllComputationIncomeStatementsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../../../utilities/sql/selectMany.js"

export const readAllComputationIncomeStatementsRoute = apiFactory
    .createApp()
    .get(readAllComputationIncomeStatementsRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllComputationIncomeStatementsRouteDefinition.schemas.body,
        })

        const readAllComputationIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            where: (table) => {
                if (body.idComputation !== undefined) {
                    return and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idComputation, body.idComputation),
                    )
                }
                if (body.idIncomeStatement !== undefined) {
                    return and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idIncomeStatement, body.idIncomeStatement),
                    )
                }
                return and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear))
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllComputationIncomeStatementsRouteDefinition.schemas.return,
            data: readAllComputationIncomeStatements,
        })
    })
