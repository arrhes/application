import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    inventoryMovementSchema,
    inventoryMovementSchemaReturn,
} from "../../../../../../../../../../schemas/inventoryMovement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneInventoryMovementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-movements/:idInventoryMovement`,
    name: "update-one-inventory-movement",
    schemas: {
        body: v.object({
            idInventoryMovement: inventoryMovementSchema.entries.id,
            idYear: inventoryMovementSchema.entries.idYear,

            quantityChange: v.optional(inventoryMovementSchema.entries.quantityChange),
            unitPriceAtMovement: v.optional(inventoryMovementSchema.entries.unitPriceAtMovement),
            reference: v.optional(inventoryMovementSchema.entries.reference),
            reason: v.optional(inventoryMovementSchema.entries.reason),
            movementDate: v.optional(inventoryMovementSchema.entries.movementDate),
        }),
        return: inventoryMovementSchemaReturn,
    },
})
