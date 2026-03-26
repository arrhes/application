import { readAllTicketsRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { selectMany } from "../../../utilities/sql/selectMany.js"

export const readAllTicketsRoute = apiFactory.createApp().post(readAllTicketsRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    await validateBodyMiddleware({
        context: c,
        schema: readAllTicketsRouteDefinition.schemas.body,
    })

    const tickets = await selectMany({
        database: c.var.clients.sql,
        table: models.ticket,
        where: (table) => eq(table.idUser, user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllTicketsRouteDefinition.schemas.return,
        data: tickets,
    })
})
