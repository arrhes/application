import { models, readAllTicketMessagesRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { selectMany } from "../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"

export const readAllTicketMessagesRoute = apiFactory
    .createApp()
    .post(readAllTicketMessagesRouteDefinition.path, async (c) => {
        const { user } = await checkAuthMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllTicketMessagesRouteDefinition.schemas.body,
        })

        // Verify ticket ownership
        await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
        })

        const messages = await selectMany({
            database: c.var.clients.sql,
            table: models.ticketMessage,
            where: (table) => eq(table.idTicket, body.idTicket),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllTicketMessagesRouteDefinition.schemas.return,
            data: messages,
        })
    })
