import { models, readOneAgentSessionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readOneAgentSessionRoute = apiFactory
    .createApp()
    .post(readOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneAgentSessionRouteDefinition.schemas.body,
        })

        const session = await selectOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneAgentSessionRouteDefinition.schemas.return,
            data: session,
        })
    })
