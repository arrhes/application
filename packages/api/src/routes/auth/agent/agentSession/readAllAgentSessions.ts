import { models, readAllAgentSessionsRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq, ilike, or } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const readAllAgentSessionsRoute = apiFactory
    .createApp()
    .post(readAllAgentSessionsRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllAgentSessionsRouteDefinition.schemas.body,
        })

        const searchQuery = body.search?.trim()

        // When a search query is provided, join with messages and filter by content
        if (searchQuery) {
            const pattern = `%${searchQuery}%`

            const rows = await c.var.clients.sql
                .selectDistinctOn(
                    [
                        models.agentSession.id,
                    ],
                    {
                        id: models.agentSession.id,
                        idOrganization: models.agentSession.idOrganization,
                        idUser: models.agentSession.idUser,
                        title: models.agentSession.title,
                        createdAt: models.agentSession.createdAt,
                        lastUpdatedAt: models.agentSession.lastUpdatedAt,
                        matchedContent: models.agentMessage.output,
                    },
                )
                .from(models.agentSession)
                .leftJoin(models.agentMessage, eq(models.agentMessage.idAgentSession, models.agentSession.id))
                .where(
                    and(
                        eq(models.agentSession.idOrganization, body.idOrganization),
                        eq(models.agentSession.idUser, user.id),
                        or(
                            ilike(models.agentSession.title, pattern),
                            ilike(models.agentMessage.output, pattern),
                            ilike(models.agentMessage.userMessage, pattern),
                        ),
                    ),
                )
                .orderBy(models.agentSession.id, desc(models.agentSession.createdAt))

            return response({
                context: c,
                statusCode: 200,
                schema: readAllAgentSessionsRouteDefinition.schemas.return,
                data: rows,
            })
        }

        const sessions = await selectMany({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idUser, user.id)),
            orderBy: (table) => desc(table.createdAt),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllAgentSessionsRouteDefinition.schemas.return,
            data: sessions.map((s) => ({
                ...s,
                matchedContent: null,
            })),
        })
    })
