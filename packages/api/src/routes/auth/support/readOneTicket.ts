import { models, readOneTicketRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"

export const readOneTicketRoute = apiFactory.createApp().post(readOneTicketRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneTicketRouteDefinition.schemas.body,
    })

    const ticket = await selectOne({
        database: c.var.clients.sql,
        table: models.ticket,
        where: (table) => and(eq(table.id, body.idTicket), eq(table.idUser, user.id)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneTicketRouteDefinition.schemas.return,
        data: ticket,
    })
})
