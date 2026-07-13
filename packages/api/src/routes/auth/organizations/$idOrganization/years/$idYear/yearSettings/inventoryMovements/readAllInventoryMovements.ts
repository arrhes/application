import { models, readAllInventoryMovementsRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"

export const readAllInventoryMovementsRoute = registerRoute(readAllInventoryMovementsRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readAllInventoryMovementsRouteDefinition.schemas.body,
    })

    const readAllInventoryMovements = await selectMany({
        database: c.var.clients.sql,
        table: models.inventoryMovement,
        where: (table) =>
            and(
                eq(table.idOrganization, idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.idInventoryItem, body.idInventoryItem),
            ),
        orderBy: (table) => desc(table.movementDate),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllInventoryMovementsRouteDefinition.schemas.return,
        data: readAllInventoryMovements,
    })
})
