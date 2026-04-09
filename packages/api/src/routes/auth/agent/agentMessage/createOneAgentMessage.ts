import {
    createOneAgentMessageRouteDefinition,
    generateId,
    models
} from "@arrhes/application-metadata"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneAgentMessageRoute = apiFactory
    .createApp()
    .post(createOneAgentMessageRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentMessageRouteDefinition.schemas.body,
        })
        await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization: body.idOrganization, })

        const newMessage = await c.var.clients.sql.transaction(async (transaction) => {

            // Add the initial user message as the first message of the session
            const newMessage = await insertOne({
                database: transaction,
                table: models.agentMessage,
                data: {
                    id: generateId(),
                    idAgentSession: body.idAgentSession,
                    role: "user",
                    content: body.message,
                    toolCalls: null,
                    toolResults: null,
                    usedTools: null,
                    state: "completed",
                    streamKey: null,
                    createdAt: new Date().toISOString(),
                },
            })

            // Add the assistant message placeholder with a streamKey
            const assistantMessage = await insertOne({
                database: transaction,
                table: models.agentMessage,
                data: {
                    id: generateId(),
                    idAgentSession: body.idAgentSession,
                    role: "assistant",
                    content: null,
                    toolCalls: null,
                    toolResults: null,
                    usedTools: null,
                    state: "streaming",
                    streamKey: generateId(),
                    createdAt: new Date().toISOString(),
                },
            })

            // Create the workerJob row
            const workerJob = await insertOne({
                database: transaction,
                table: models.workerJob,
                data: {
                    id: generateId(),
                    idAgentMessage: assistantMessage.id,
                    status: "pending",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                },
            })

            // Enqueue the job to Bull
            await c.var.clients.queue.add(
                {
                    fn: "runAgentSession",
                    args: [{ idAgentMessage: assistantMessage.id, idWorkerJob: workerJob.id }],
                },
                {
                    jobId: workerJob.id,
                    priority: 1,
                },
            )

            return newMessage
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentMessageRouteDefinition.schemas.return,
            data: newMessage,
        })
    })
