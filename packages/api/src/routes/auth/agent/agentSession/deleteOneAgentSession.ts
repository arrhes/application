import { deleteOneAgentSessionRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { deleteOne } from "../../../../utilities/sql/deleteOne.js"

export const deleteOneAgentSessionRoute = apiFactory
    .createApp()
    .post(deleteOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneAgentSessionRouteDefinition.schemas.body,
        })

        await deleteOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneAgentSessionRouteDefinition.schemas.return,
            data: {},
        })
    })
