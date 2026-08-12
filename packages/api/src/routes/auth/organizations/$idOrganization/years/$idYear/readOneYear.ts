import { models, readOneYearRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOneYearRoute = registerRoute(readOneYearRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneYearRouteDefinition.schemas.body,
    })

    const readOneYear = await selectOne({
        database: c.var.clients.sql,
        table: models.year,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneYearRouteDefinition.schemas.return,
        data: readOneYear,
    })
})
