import {
    createOneAgentSessionRouteDefinition,
    deleteOneAgentSessionRouteDefinition,
    generateId,
    models,
    readAllAgentSessionsRouteDefinition,
    readOneAgentSessionRouteDefinition,
} from "@arrhes/application-metadata"
import { and, asc, desc, eq, ilike, or } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"
import { deleteOne } from "../../../utilities/sql/deleteOne.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"

export const createOneAgentSessionRoute = apiFactory
    .createApp()
    .post(createOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentSessionRouteDefinition.schemas.body,
        })

        const now = new Date().toISOString()

        const session = await insertOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data: {
                id: generateId(),
                idOrganization: body.idOrganization,
                idUser: user.id,
                title: body.title ?? null,
                createdAt: now,
                lastUpdatedAt: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentSessionRouteDefinition.schemas.return,
            data: session,
        })
    })

export const readAllAgentSessionsRoute = apiFactory
    .createApp()
    .post(readAllAgentSessionsRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllAgentSessionsRouteDefinition.schemas.body,
        })

        const searchQuery = body.search?.trim()

        // When a search query is provided, join with messages and filter by content
        if (searchQuery) {
            const pattern = `%${searchQuery}%`

            const rows = await c.var.clients.sql
                .selectDistinctOn([models.agentSession.id], {
                    id: models.agentSession.id,
                    idOrganization: models.agentSession.idOrganization,
                    idUser: models.agentSession.idUser,
                    title: models.agentSession.title,
                    createdAt: models.agentSession.createdAt,
                    lastUpdatedAt: models.agentSession.lastUpdatedAt,
                    matchedContent: models.agentMessage.content,
                })
                .from(models.agentSession)
                .leftJoin(models.agentMessage, eq(models.agentMessage.idAgentSession, models.agentSession.id))
                .where(
                    and(
                        eq(models.agentSession.idOrganization, body.idOrganization),
                        eq(models.agentSession.idUser, user.id),
                        or(ilike(models.agentSession.title, pattern), ilike(models.agentMessage.content, pattern)),
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
            data: sessions.map((s) => ({ ...s, matchedContent: null })),
        })
    })

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

        const messages = await selectMany({
            database: c.var.clients.sql,
            table: models.agentMessage,
            where: (table) => eq(table.idAgentSession, session.id),
            orderBy: (table) => asc(table.createdAt),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneAgentSessionRouteDefinition.schemas.return,
            data: {
                ...session,
                messages,
            },
        })
    })

export const deleteOneAgentSessionRoute = apiFactory
    .createApp()
    .post(deleteOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneAgentSessionRouteDefinition.schemas.body,
        })

        // Verify ownership
        const session = await selectOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        if (!session) {
            throw new Exception({
                statusCode: 404,
                internalMessage: "Agent session not found",
                externalMessage: "Session introuvable",
            })
        }

        // Delete all messages first
        await c.var.clients.sql
            .delete(models.agentMessage)
            .where(eq(models.agentMessage.idAgentSession, body.idAgentSession))

        await deleteOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => eq(table.id, body.idAgentSession),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneAgentSessionRouteDefinition.schemas.return,
            data: {},
        })
    })
