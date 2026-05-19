import { models, updateOneTicketRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateOneTicketRoute = registerRoute(updateOneTicketRouteDefinition, async (c) => {
    const { user } = await checkAuthMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneTicketRouteDefinition.schemas.body,
    })

    // Verify ticket ownership
    await selectOne({
        database: c.var.clients.sql,
        table: models.ticket,
        where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
    })

    const now = new Date().toISOString()

    const data: Record<string, string> = {
        lastUpdatedAt: now,
    }
    if (body.status !== undefined) data.status = body.status
    if (body.category !== undefined) data.category = body.category

    await updateOne({
        database: c.var.clients.sql,
        table: models.ticket,
        data,
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
        schema: updateOneTicketRouteDefinition.schemas.return,
        data: ticket,
    })
})
