import { adminReadOneTicketRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAdminUserSessionMiddleware } from "../../../../middlewares/checkAdminUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const adminReadOneTicketRoute = apiFactory
    .createApp()
    .post(adminReadOneTicketRouteDefinition.path, async (c) => {
        await checkAdminUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: adminReadOneTicketRouteDefinition.schemas.body,
        })

        const ticket = await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => eq(table.id, body.idTicket),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: adminReadOneTicketRouteDefinition.schemas.return,
            data: ticket,
        })
    })
