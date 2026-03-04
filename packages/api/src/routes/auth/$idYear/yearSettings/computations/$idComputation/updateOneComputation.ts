import { models, updateOneComputationRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateOneComputationRoute = apiFactory
    .createApp()
    .post(updateOneComputationRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneComputationRouteDefinition.schemas.body,
        })

        const updateOneComputation = await updateOne({
            database: c.var.clients.sql,
            table: models.computation,
            data: {
                number: body.number,
                label: body.label,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
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
            schema: updateOneComputationRouteDefinition.schemas.return,
            data: updateOneComputation,
        })
    })
