import { models, readAllAgentMessagesRouteDefinition } from "@arrhes/application-metadata"
import { and, asc, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const readAllAgentMessagesRoute = apiFactory
    .createApp()
    .get(readAllAgentMessagesRouteDefinition.path, async (c) => {
        await checkAuthMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllAgentMessagesRouteDefinition.schemas.body,
        })

        const messages = await selectMany({
            database: c.var.clients.sql,
            table: models.agentMessage,
            where: (table) => and(eq(table.idAgentSession, body.idAgentSession)),
            orderBy: (table) => asc(table.createdAt),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllAgentMessagesRouteDefinition.schemas.return,
            data: messages,
        })
    })
