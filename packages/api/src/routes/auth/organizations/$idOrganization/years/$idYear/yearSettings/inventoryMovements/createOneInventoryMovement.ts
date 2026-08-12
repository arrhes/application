import { createOneInventoryMovementRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const createOneInventoryMovementRoute = registerRoute(createOneInventoryMovementRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneInventoryMovementRouteDefinition.schemas.body,
    })

    const createOneInventoryMovement = await c.var.clients.sql.transaction(async (tx) => {
        await selectOne({
            database: tx,
            table: models.inventoryItem,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idInventoryItem),
                ),
        })

        const createdMovement = await insertOne({
            database: tx,
            table: models.inventoryMovement,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                idInventoryItem: body.idInventoryItem,

                quantityChange: body.quantityChange,
                unitPriceAtMovement: body.unitPriceAtMovement ?? null,
                reference: body.reference ?? null,
                reason: body.reason ?? null,
                movementDate: body.movementDate,

                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: auth.user.id,
                lastUpdatedBy: null,
            },
        })

        await updateOne({
            database: tx,
            table: models.inventoryItem,
            data: {
                currentQuantity: sql`${models.inventoryItem.currentQuantity} + ${body.quantityChange}`,
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: auth.user.id,
            },
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idInventoryItem),
                ),
        })

        return createdMovement
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneInventoryMovementRouteDefinition.schemas.return,
        data: createOneInventoryMovement,
    })
})
