import { models, updateOneTicketStatusRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateOneTicketStatusRoute = apiFactory
    .createApp()
    .post(updateOneTicketStatusRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneTicketStatusRouteDefinition.schemas.body,
        })

        // Verify ticket ownership
        await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
        })

        const now = new Date().toISOString()

        await updateOne({
            database: c.var.clients.sql,
            table: models.ticket,
            data: {
                status: body.status,
                lastUpdatedAt: now,
            },
            where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
        })

        const ticket = await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneTicketStatusRouteDefinition.schemas.return,
            data: ticket,
        })
    })
