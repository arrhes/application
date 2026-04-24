import { models, readAllInvoicesRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readAllInvoicesRoute = apiFactory.createApp().post(readAllInvoicesRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const _body = await validateBodyMiddleware({
        context: c,
        schema: readAllInvoicesRouteDefinition.schemas.body,
    })

    await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
    })

    const invoices = await selectMany({
        database: c.var.clients.sql,
        table: models.invoice,
        where: (table) => eq(table.idOrganization, idOrganization),
        orderBy: (table) => desc(table.periodStart),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllInvoicesRouteDefinition.schemas.return,
        data: invoices,
    })
})
