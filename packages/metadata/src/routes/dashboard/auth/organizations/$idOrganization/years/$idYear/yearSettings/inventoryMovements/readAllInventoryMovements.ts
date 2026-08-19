import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import {
    inventoryMovementSchema,
    inventoryMovementSchemaReturn,
} from "../../../../../../../../../schemas/inventoryMovement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllInventoryMovementsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-movements`,
    name: "read-all-inventory-movements",
    schemas: {
        body: v.object({
            idYear: inventoryMovementSchema.entries.idYear,
            idInventoryItem: inventoryMovementSchema.entries.idInventoryItem,
        }),
        return: v.array(inventoryMovementSchemaReturn),
    },
})
