import { models, removeOneEntryTagRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../utilities/sql/deleteOne.js"

export const removeOneEntryTagRoute = apiFactory.createApp().post(removeOneEntryTagRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: removeOneEntryTagRouteDefinition.schemas.body,
    })

    const removeOneEntryTag = await deleteOne({
        database: c.var.clients.sql,
        table: models.entryTag,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idEntryTag)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: removeOneEntryTagRouteDefinition.schemas.return,
        data: removeOneEntryTag,
    })
})
