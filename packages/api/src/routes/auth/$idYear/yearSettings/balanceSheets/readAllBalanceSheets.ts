import { models, readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const readAllBalanceSheetsRoute = apiFactory
    .createApp()
    .post(readAllBalanceSheetsRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllBalanceSheetsRouteDefinition.schemas.body,
        })

        const readAllBalanceSheets = await selectMany({
            database: c.var.clients.sql,
            table: models.balanceSheet,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllBalanceSheetsRouteDefinition.schemas.return,
            data: readAllBalanceSheets,
        })
    })
