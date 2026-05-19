import { models, readOneInvoiceRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const readOneInvoiceRoute = registerRoute(readOneInvoiceRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneInvoiceRouteDefinition.schemas.body,
    })

    await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
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
