import { createOneAgentSessionRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneAgentSessionRoute = apiFactory
    .createApp()
    .post(createOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkAuthMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentSessionRouteDefinition.schemas.body,
        })
        await checkOrganizationSubscriptionSessionMiddleware({
            context: c,
            idOrganization: body.idOrganization,
            checkType: "tokens",
        })

        const newSession = await insertOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data: {
                id: generateId(),
                idOrganization: body.idOrganization,
                idUser: user.id,
                title: body.message.slice(0, 128),
                idYear: body.idYear,
                customInstructions: body.customInstructions,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentSessionRouteDefinition.schemas.return,
            data: newSession,
        })
    })
