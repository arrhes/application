import { models, readOneRecordRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

export const readOneRecordRoute = apiFactory.createApp().post(readOneRecordRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneRecordRouteDefinition.schemas.body,
    })

    const readOneRecord = await selectOne({
        database: c.var.clients.sql,
        table: models.record,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idRecord)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneRecordRouteDefinition.schemas.return,
        data: readOneRecord,
    })
})
