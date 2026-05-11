import { addOneEntryTagRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const addOneEntryTagRoute = apiFactory.createApp().post(addOneEntryTagRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: addOneEntryTagRouteDefinition.schemas.body,
    })

    // Verify entry exists
    await selectOne({
        database: c.var.clients.sql,
        table: models.entry,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idEntry)),
    })

    // Verify tag exists
    await selectOne({
        database: c.var.clients.sql,
        table: models.tag,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idTag)),
    })

    const addOneEntryTag = await insertOne({
        database: c.var.clients.sql,
        table: models.entryTag,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idEntry: body.idEntry,
            idTag: body.idTag,
            createdAt: new Date().toISOString(),
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: addOneEntryTagRouteDefinition.schemas.return,
        data: addOneEntryTag,
    })
})
