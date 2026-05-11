import { models, readOneTagRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOneTagRoute = apiFactory.createApp().post(readOneTagRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneTagRouteDefinition.schemas.body,
    })

    const readOneTag = await selectOne({
        database: c.var.clients.sql,
        table: models.tag,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idTag)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneTagRouteDefinition.schemas.return,
        data: readOneTag,
    })
})
