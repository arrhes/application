import { models, readOneComputationRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneComputationRoute = apiFactory.createApp().get(readOneComputationRouteDefinition.path, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneComputationRouteDefinition.schemas.body,
    })

    const readOneComputation = await selectOne({
        database: c.var.clients.sql,
        table: models.computation,
        where: (table) =>
            and(
                eq(table.idOrganization, idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idComputation),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneComputationRouteDefinition.schemas.return,
        data: readOneComputation,
    })
})
