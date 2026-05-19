import { createOneTicketMessageRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const createOneTicketMessageRoute = apiFactory
    .createApp()
    .post(createOneTicketMessageRouteDefinition.path, async (c) => {
        const { user } = await checkAuthMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneTicketMessageRouteDefinition.schemas.body,
        })

        const now = new Date().toISOString()

        // Verify ticket ownership
        await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
        })

        const ticketMessage = await insertOne({
            database: c.var.clients.sql,
            table: models.ticketMessage,
            data: {
                id: generateId(),
                idTicket: body.idTicket,
                idUser: user.id,
                idAdminUser: null,
                message: body.message,
                createdAt: now,
            },
        })

        await updateOne({
            database: c.var.clients.sql,
            table: models.ticket,
            data: {
                lastUpdatedAt: now,
            },
            where: (table) => eq(table.id, body.idTicket),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneTicketMessageRouteDefinition.schemas.return,
            data: ticketMessage,
        })
    })
