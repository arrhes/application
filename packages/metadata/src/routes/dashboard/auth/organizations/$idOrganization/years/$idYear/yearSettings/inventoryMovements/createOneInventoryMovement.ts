import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import {
    inventoryMovementSchema,
    inventoryMovementSchemaReturn,
} from "../../../../../../../../../schemas/inventoryMovement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneInventoryMovementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-movements`,
    name: "create-one-inventory-movement",
    schemas: {
        body: v.object({
            idYear: inventoryMovementSchema.entries.idYear,
            idInventoryItem: inventoryMovementSchema.entries.idInventoryItem,

            quantityChange: inventoryMovementSchema.entries.quantityChange,
            unitPriceAtMovement: v.optional(inventoryMovementSchema.entries.unitPriceAtMovement),
            reference: v.optional(inventoryMovementSchema.entries.reference),
            reason: v.optional(inventoryMovementSchema.entries.reason),
            movementDate: inventoryMovementSchema.entries.movementDate,
        }),
        return: inventoryMovementSchemaReturn,
    },
})
