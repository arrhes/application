import { createOneAgentMessageRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneAgentMessageRoute = apiFactory
    .createApp()
    .post(createOneAgentMessageRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentMessageRouteDefinition.schemas.body,
        })
        await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization: body.idOrganization })

        const { assistantMessage, workerJob } = await c.var.clients.sql.transaction(async (transaction) => {
            // Create a single message row with the user's question and an assistant streaming placeholder
            const assistantMessage = await insertOne({
                database: transaction,
                table: models.agentMessage,
                data: {
                    id: generateId(),
                    idAgentSession: body.idAgentSession,
                    userMessage: body.message,
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

            return { assistantMessage, workerJob }
        })

        // Enqueue the job to Bull AFTER the transaction commits
        // so the worker can find the rows in the database
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

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentMessageRouteDefinition.schemas.return,
            data: assistantMessage,
        })
    })
