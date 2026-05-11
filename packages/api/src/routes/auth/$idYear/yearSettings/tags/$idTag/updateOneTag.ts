import { models, updateOneTagRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateOneTagRoute = apiFactory.createApp().post(updateOneTagRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneTagRouteDefinition.schemas.body,
    })

    const updateOneTag = await updateOne({
        database: c.var.clients.sql,
        table: models.tag,
        data: {
            label: body.label,

            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: user.id,
        },
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idTag)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneTagRouteDefinition.schemas.return,
        data: updateOneTag,
    })
})
