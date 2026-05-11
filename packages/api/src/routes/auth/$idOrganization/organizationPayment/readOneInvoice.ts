import { models, readOneInvoiceRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readOneInvoiceRoute = apiFactory.createApp().post(readOneInvoiceRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneInvoiceRouteDefinition.schemas.body,
    })

    await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
    })

    const invoice = await selectOne({
        database: c.var.clients.sql,
        table: models.invoice,
        where: (table) => and(eq(table.id, body.idInvoice), eq(table.idOrganization, idOrganization)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneInvoiceRouteDefinition.schemas.return,
        data: invoice,
    })
})
