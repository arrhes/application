import { models, undoAgentActionRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../utilities/exception.js"
import { registerRoute } from "../../../../utilities/registerRoute.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const undoAgentActionRoute = registerRoute(undoAgentActionRouteDefinition, async (c) => {
    const { user } = await checkAuthMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: undoAgentActionRouteDefinition.schemas.body,
    })

    // Find the message
    const message = await selectOne({
        database: c.var.clients.sql,
        table: models.agentMessage,
        where: (table) => eq(table.id, body.idAgentMessage),
    })

    // Verify user owns the session
    const session = await selectOne({
        database: c.var.clients.sql,
        table: models.agentSession,
        where: (table) => eq(table.id, message.idAgentSession),
    })

    if (session.idUser !== user.id) {
        throw new Exception({
            statusCode: 403,
            internalMessage: "User does not own this agent session",
            externalMessage: "Acces refuse",
        })
    }

    // Read undo data from toolResults JSONB
    const toolResults = message.toolResults as Array<{
        undoAction?: {
            path: string
            body: Record<string, unknown>
        }
    }> | null

    if (!toolResults || toolResults.length === 0) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "No undo data available",
            externalMessage: "Aucune action a annuler",
        })
    }

    const appFetch = c.var.appFetch
    if (!appFetch) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "appFetch not available on context",
        })
    }

    // Execute each undo action
    for (const result of toolResults) {
        if (result.undoAction) {
            const internalRequest = new Request(`http://internal${result.undoAction.path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: c.req.header("Cookie") ?? "",
                    Authorization: c.req.header("Authorization") ?? "",
                    "X-Organization-Id": c.req.header("X-Organization-Id") ?? "",
                },
                body: JSON.stringify(result.undoAction.body),
            })

            const undoResponse = await appFetch(internalRequest)
            if (!undoResponse.ok) {
                throw new Exception({
                    statusCode: 500,
                    internalMessage: `Undo action failed for ${result.undoAction.path}`,
                    externalMessage: "L'annulation a echoue",
                })
            }
        }
    }

    return response({
        context: c,
        statusCode: 200,
        schema: undoAgentActionRouteDefinition.schemas.return,
        data: {},
    })
})
