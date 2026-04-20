import {
    createOneAgentMessageRouteDefinition,
    generateId,
    getCurrentMonthStartISO,
    isUsageMonthOutdated,
    models,
    premiumOrganizationUsageLimits,
} from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const createOneAgentMessageRoute = apiFactory
    .createApp()
    .post(createOneAgentMessageRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentMessageRouteDefinition.schemas.body,
        })

        const session = await selectOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => eq(table.id, body.idAgentSession),
        })

        if (session.idUser !== user.id) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Agent session access denied",
                externalMessage: "Vous n'avez pas accès à cette session agent",
            })
        }

        if (session.idOrganization !== body.idOrganization) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Organization/session mismatch",
                externalMessage: "L'organisation demandée ne correspond pas à la session agent",
            })
        }

        await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization: session.idOrganization })

        const monthStartISO = getCurrentMonthStartISO()
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, session.idOrganization),
        })
        const shouldResetUsageCounters = isUsageMonthOutdated({
            usageMonthStartAt: organization.usageMonthStartAt,
            monthStartISO,
        })
        const currentTokenUsage = shouldResetUsageCounters ? 0 : organization.agentTokensCurrentMonthUsage

        // Gate on token budget — reject only when nearly exhausted (less than 50K tokens remain)
        if (premiumOrganizationUsageLimits.agentTokensPerMonth - currentTokenUsage < 0) {
            throw new Exception({
                statusCode: 429,
                internalMessage: "Agent monthly token limit reached",
                externalMessage: "Limite mensuelle de tokens agent atteinte pour votre organisation",
            })
        }

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
                    references: body.references ?? null,
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

            await updateOne({
                database: transaction,
                table: models.organization,
                data: {
                    usageMonthStartAt: monthStartISO,
                    ocrCurrentMonthPagesUsage: shouldResetUsageCounters ? 0 : organization.ocrCurrentMonthPagesUsage,
                    agentTokensCurrentMonthUsage: currentTokenUsage,
                },
                where: (table) => eq(table.id, session.idOrganization),
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
