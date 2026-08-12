import { models, readAllEntriesRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"

export const readAllEntriesRoute = registerRoute(readAllEntriesRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllEntriesRouteDefinition.schemas.body,
    })

    const readAllEntries = await selectMany({
        database: c.var.clients.sql,
        table: models.entry,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllEntriesRouteDefinition.schemas.return,
        data: readAllEntries,
    })
})
