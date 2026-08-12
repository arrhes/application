import { models, updateOneJournalRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneJournalRoute = registerRoute(updateOneJournalRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
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
            lastUpdatedBy: auth.user.id,
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
