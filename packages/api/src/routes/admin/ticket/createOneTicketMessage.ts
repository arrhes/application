import { adminCreateOneTicketMessageRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAdminUserSessionMiddleware } from "../../../middlewares/checkAdminUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const adminCreateOneTicketMessageRoute = apiFactory
    .createApp()
    .post(adminCreateOneTicketMessageRouteDefinition.path, async (c) => {
        const { adminUser } = await checkAdminUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: adminCreateOneTicketMessageRouteDefinition.schemas.body,
        })

        const now = new Date().toISOString()

        const ticketMessage = await insertOne({
            database: c.var.clients.sql,
            table: models.ticketMessage,
            data: {
                id: generateId(),
                idTicket: body.idTicket,
                idUser: null,
                idAdminUser: adminUser.id,
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
            schema: adminCreateOneTicketMessageRouteDefinition.schemas.return,
            data: ticketMessage,
        })
    })
