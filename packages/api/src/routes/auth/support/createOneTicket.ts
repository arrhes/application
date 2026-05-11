import { createOneTicketRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { sendEmail } from "../../../utilities/email/sendEmail.js"
import { supportTemplate } from "../../../utilities/email/templates/support.js"
import { response } from "../../../utilities/response.js"
import { insertOne } from "../../../utilities/sql/insertOne.js"

export const createOneTicketRoute = apiFactory.createApp().post(createOneTicketRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneTicketRouteDefinition.schemas.body,
    })

    const now = new Date().toISOString()

    const ticket = await insertOne({
        database: c.var.clients.sql,
        table: models.ticket,
        data: {
            id: generateId(),
            idUser: user.id,
            category: body.category,
            status: "open",
            createdAt: now,
            lastUpdatedAt: null,
        },
    })

    await insertOne({
        database: c.var.clients.sql,
        table: models.ticketMessage,
        data: {
            id: generateId(),
            idTicket: ticket.id,
            idUser: user.id,
            idAdminUser: null,
            message: body.message,
            createdAt: now,
        },
    })

    await sendEmail({
        var: c.var,
        to: "support@arrhes.fr",
        subject: `[Support] ${user.id}`,
        html: supportTemplate({
            category: body.category,
            date: now,
            message: body.message,
        }),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneTicketRouteDefinition.schemas.return,
        data: ticket,
    })
})
