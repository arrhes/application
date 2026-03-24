import { models, readAllEntryTagsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const readAllEntryTagsRoute = apiFactory.createApp().post(readAllEntryTagsRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllEntryTagsRouteDefinition.schemas.body,
    })

    const readAllEntryTags = await selectMany({
        database: c.var.clients.sql,
        table: models.entryTag,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllEntryTagsRouteDefinition.schemas.return,
        data: readAllEntryTags,
    })
})
