import {
    models,
    readAllAgentMessagesRouteDefinition
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const readAllAgentMessagesRoute = apiFactory
    .createApp()
    .post(readAllAgentMessagesRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllAgentMessagesRouteDefinition.schemas.body,
        })

        const messages = await selectMany({
            database: c.var.clients.sql,
            table: models.agentMessage,
            where: (table) => and(eq(table.idAgentSession, body.idAgentSession)),
            // orderBy: (table) => desc(table.createdAt),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllAgentMessagesRouteDefinition.schemas.return,
            data: messages,
        })
    })
