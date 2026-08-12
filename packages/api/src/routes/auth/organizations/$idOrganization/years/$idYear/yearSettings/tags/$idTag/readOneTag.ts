import { models, readOneTagRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneTagRoute = registerRoute(readOneTagRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
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
