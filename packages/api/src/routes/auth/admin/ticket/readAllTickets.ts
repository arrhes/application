import { adminReadAllTicketsRouteDefinition, models } from "@arrhes/application-metadata"
import { checkAdminUserSessionMiddleware } from "../../../../middlewares/checkAdminUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const adminReadAllTicketsRoute = apiFactory
    .createApp()
    .post(adminReadAllTicketsRouteDefinition.path, async (c) => {
        await checkAdminUserSessionMiddleware({ context: c })
        await validateBodyMiddleware({
            context: c,
            schema: adminReadAllTicketsRouteDefinition.schemas.body,
        })

        const tickets = await selectMany({
            database: c.var.clients.sql,
            table: models.ticket,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: adminReadAllTicketsRouteDefinition.schemas.return,
            data: tickets,
        })
    })
