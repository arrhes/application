import { models, updateOneEntryRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const updateOneEntryRoute = apiFactory.createApp().post(updateOneEntryRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneEntryRouteDefinition.schemas.body,
    })

    const updatedEntry = await c.var.clients.sql.transaction(async (tx) => {
        const updatedEntry = await updateOne({
            database: tx,
            table: models.entry,
            data: {
                idJournal: body.idJournal,
                idFile: body.idFile,
                label: body.label,
                date: body.date,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idEntry),
                ),
        })

        return updatedEntry
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneEntryRouteDefinition.schemas.return,
        data: updatedEntry,
    })
})
