import { models, readOneComputationRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOneComputationRoute = apiFactory
    .createApp()
    .post(readOneComputationRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
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
