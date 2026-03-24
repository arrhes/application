import { deleteOneTagRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../utilities/sql/deleteOne.js"

export const deleteOneTagRoute = apiFactory.createApp().post(deleteOneTagRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneTagRouteDefinition.schemas.body,
    })

    const deleteOneTag = await deleteOne({
        database: c.var.clients.sql,
        table: models.tag,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idTag)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneTagRouteDefinition.schemas.return,
        data: deleteOneTag,
    })
})
