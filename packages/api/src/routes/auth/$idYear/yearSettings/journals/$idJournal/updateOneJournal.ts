import { models, updateOneJournalRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateOneJournalRoute = apiFactory.createApp().post(updateOneJournalRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneJournalRouteDefinition.schemas.body,
    })

    const updateOneJournal = await updateOne({
        database: c.var.clients.sql,
        table: models.journal,
        data: {
            code: body.code,
            label: body.label,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: user.id,
        },
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idJournal)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneJournalRouteDefinition.schemas.return,
        data: updateOneJournal,
    })
})
