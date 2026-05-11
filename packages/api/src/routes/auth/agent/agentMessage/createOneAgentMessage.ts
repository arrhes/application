import { createOneAgentMessageRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

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

        await checkOrganizationSubscriptionSessionMiddleware({
            context: c,
            idOrganization: session.idOrganization,
            checkType: "tokens",
        })

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, session.idOrganization),
        })

        if (organization.tokensTotalAvailable <= 0) {
            throw new Exception({
                statusCode: 429,
                internalMessage: "Agent token balance exhausted",
                externalMessage: "Le solde de tokens de votre organisation est épuisé",
            })
        }

        const assistantMessage = await insertOne({
            database: c.var.clients.sql,
            table: models.agentMessage,
            data: {
                id: generateId(),
                idAgentSession: body.idAgentSession,
                userMessage: body.message,
                input: null,
                output: null,
                toolCalls: null,
                toolResults: null,
                usedTools: null,
                references: body.references ?? null,
                state: "streaming",
                depth: 0,
                streamKey: generateId(),
                createdAt: new Date().toISOString(),
            },
        })

        // Enqueue the job to Bull AFTER the transaction commits
        // so the worker can find the rows in the database
        await c.var.clients.queue.add(
            {
                fn: "runAgentSession",
                args: [{ idAgentMessage: assistantMessage.id }],
            },
            {
                jobId: assistantMessage.id,
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
