import { deleteOneRecordRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { deleteOne } from "../../../../../utilities/sql/deleteOne.js"

export const deleteOneRecordRoute = apiFactory.createApp().post(deleteOneRecordRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneRecordRouteDefinition.schemas.body,
    })

    const deleteOneRecord = await deleteOne({
        database: c.var.clients.sql,
        table: models.record,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idRecord)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneRecordRouteDefinition.schemas.return,
        data: deleteOneRecord,
    })
})
