import { adminReadAllTicketMessagesRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAdminUserSessionMiddleware } from "../../../../middlewares/checkAdminUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const adminReadAllTicketMessagesRoute = apiFactory
    .createApp()
    .post(adminReadAllTicketMessagesRouteDefinition.path, async (c) => {
        await checkAdminUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: adminReadAllTicketMessagesRouteDefinition.schemas.body,
        })

        const messages = await selectMany({
            database: c.var.clients.sql,
            table: models.ticketMessage,
            where: (table) => eq(table.idTicket, body.idTicket),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: adminReadAllTicketMessagesRouteDefinition.schemas.return,
            data: messages,
        })
    })
