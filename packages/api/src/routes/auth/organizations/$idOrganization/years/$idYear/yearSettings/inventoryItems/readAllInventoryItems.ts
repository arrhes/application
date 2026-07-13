import { models, readAllInventoryItemsRouteDefinition } from "@arrhes/application-metadata"
import { and, asc, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllInventoryItemsRoute = registerRoute(readAllInventoryItemsRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllInventoryItemsRouteDefinition.schemas.body,
    })

    const readAllInventoryItems = await selectMany({
        database: c.var.clients.sql,
        table: models.inventoryItem,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        orderBy: (table) => asc(table.name),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllInventoryItemsRouteDefinition.schemas.return,
        data: readAllInventoryItems,
    })
})
