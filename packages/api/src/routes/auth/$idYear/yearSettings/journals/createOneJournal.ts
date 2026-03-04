import { createOneJournalRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneJournalRoute = apiFactory.createApp().post(createOneJournalRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneJournalRouteDefinition.schemas.body,
    })

    const createOneJournal = await insertOne({
        database: c.var.clients.sql,
        table: models.journal,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            code: body.code,
            label: body.label,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneJournalRouteDefinition.schemas.return,
        data: createOneJournal,
    })
})
