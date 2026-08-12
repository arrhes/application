import { models, readOneEntryRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"

export const readOneEntryRoute = registerRoute(readOneEntryRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneEntryRouteDefinition.schemas.body,
    })

    const readOneEntry = await selectOne({
        database: c.var.clients.sql,
        table: models.entry,
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idEntry)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneEntryRouteDefinition.schemas.return,
        data: readOneEntry,
    })
})
