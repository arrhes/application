import { models, readAllRecordRowsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const readAllRecordRowsRoute = apiFactory.createApp().post(readAllRecordRowsRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllRecordRowsRouteDefinition.schemas.body,
    })

    const readAllRecordRows = await selectMany({
        database: c.var.clients.sql,
        table: models.recordRow,
        where: (table) => {
            if (body.idRecord !== null && body.idRecord !== undefined) {
                return and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.idRecord, body.idRecord),
                )
            }
            return and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear))
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllRecordRowsRouteDefinition.schemas.return,
        data: readAllRecordRows,
    })
})
