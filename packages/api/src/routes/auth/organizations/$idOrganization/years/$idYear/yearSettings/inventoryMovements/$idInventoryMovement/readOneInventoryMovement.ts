import { models, readOneInventoryMovementRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"

export const readOneInventoryMovementRoute = registerRoute(readOneInventoryMovementRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneInventoryMovementRouteDefinition.schemas.body,
    })

    const readOneInventoryMovement = await selectOne({
        database: c.var.clients.sql,
        table: models.inventoryMovement,
        where: (table) =>
            and(
                eq(table.idOrganization, idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idInventoryMovement),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readOneInventoryMovementRouteDefinition.schemas.return,
        data: readOneInventoryMovement,
    })
})
