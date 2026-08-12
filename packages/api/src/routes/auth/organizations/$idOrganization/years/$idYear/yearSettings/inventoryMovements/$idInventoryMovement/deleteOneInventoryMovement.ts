import { deleteOneInventoryMovementRouteDefinition, models } from "@comptasse/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const deleteOneInventoryMovementRoute = registerRoute(deleteOneInventoryMovementRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneInventoryMovementRouteDefinition.schemas.body,
    })

    await c.var.clients.sql.transaction(async (tx) => {
        const previousMovement = await selectOne({
            database: tx,
            table: models.inventoryMovement,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idInventoryMovement),
                ),
        })

        await deleteOne({
            database: tx,
            table: models.inventoryMovement,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idInventoryMovement),
                ),
        })

        await updateOne({
            database: tx,
            table: models.inventoryItem,
            data: {
                currentQuantity: sql`${models.inventoryItem.currentQuantity} - ${previousMovement.quantityChange}`,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, previousMovement.idInventoryItem),
                ),
        })
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneInventoryMovementRouteDefinition.schemas.return,
        data: {},
    })
})
