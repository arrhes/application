import { models, readAllIncomeStatementsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllIncomeStatementsRoute = apiFactory
    .createApp()
    .post(readAllIncomeStatementsRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllIncomeStatementsRouteDefinition.schemas.body,
        })

        const readAllIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.incomeStatement,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllIncomeStatementsRouteDefinition.schemas.return,
            data: readAllIncomeStatements,
        })
    })
