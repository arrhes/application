import { adminUpdateOneTicketStatusRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAdminUserSessionMiddleware } from "../../../../middlewares/checkAdminUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const adminUpdateOneTicketStatusRoute = apiFactory
    .createApp()
    .post(adminUpdateOneTicketStatusRouteDefinition.path, async (c) => {
        await checkAdminUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: adminUpdateOneTicketStatusRouteDefinition.schemas.body,
        })

        const now = new Date().toISOString()

        await updateOne({
            database: c.var.clients.sql,
            table: models.ticket,
            data: {
                status: body.status,
                lastUpdatedAt: now,
            },
            where: (table) => eq(table.id, body.idTicket),
        })

        const ticket = await selectOne({
            database: c.var.clients.sql,
            table: models.ticket,
            where: (table) => eq(table.id, body.idTicket),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: adminUpdateOneTicketStatusRouteDefinition.schemas.return,
            data: ticket,
        })
    })
