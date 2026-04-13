import { models, updateOneAgentSessionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const updateOneAgentSessionRoute = apiFactory
    .createApp()
    .post(updateOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneAgentSessionRouteDefinition.schemas.body,
        })

        const updated = await updateOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data: {
                idYear: body.idYear,
                customInstructions: body.customInstructions,
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneAgentSessionRouteDefinition.schemas.return,
            data: updated,
        })
    })
