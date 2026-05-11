import { deleteOneEntryRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { deleteOne } from "../../../../../utilities/sql/deleteOne.js"

export const deleteOneEntryRoute = apiFactory.createApp().post(deleteOneEntryRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneEntryRouteDefinition.schemas.body,
    })

    const deleteOneEntry = await deleteOne({
        database: c.var.clients.sql,
        table: models.entry,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idEntry)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneEntryRouteDefinition.schemas.return,
        data: deleteOneEntry,
    })
})
