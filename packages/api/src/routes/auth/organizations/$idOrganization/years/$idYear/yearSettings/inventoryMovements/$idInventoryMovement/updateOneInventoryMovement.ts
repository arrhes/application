import { models, updateOneInventoryMovementRouteDefinition } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneInventoryMovementRoute = registerRoute(updateOneInventoryMovementRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneInventoryMovementRouteDefinition.schemas.body,
    })

    const updateOneInventoryMovement = await c.var.clients.sql.transaction(async (tx) => {
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

        const updatedMovement = await updateOne({
            database: tx,
            table: models.inventoryMovement,
            data: {
                quantityChange: body.quantityChange ?? previousMovement.quantityChange,
                unitPriceAtMovement: body.unitPriceAtMovement ?? previousMovement.unitPriceAtMovement,
                reference: body.reference ?? previousMovement.reference,
                reason: body.reason ?? previousMovement.reason,
                movementDate: body.movementDate ?? previousMovement.movementDate,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idInventoryMovement),
                ),
        })

        const newQuantityChange = body.quantityChange ?? previousMovement.quantityChange
        const delta = Number(newQuantityChange) - Number(previousMovement.quantityChange)
        if (delta !== 0) {
            await updateOne({
                database: tx,
                table: models.inventoryItem,
                data: {
                    currentQuantity: sql`${models.inventoryItem.currentQuantity} + ${delta.toFixed(2)}`,
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
        }

        return updatedMovement
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneInventoryMovementRouteDefinition.schemas.return,
        data: updateOneInventoryMovement,
    })
})
