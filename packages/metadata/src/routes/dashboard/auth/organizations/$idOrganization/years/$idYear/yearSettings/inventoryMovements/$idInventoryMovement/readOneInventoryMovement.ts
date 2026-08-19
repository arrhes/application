import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    inventoryMovementSchema,
    inventoryMovementSchemaReturn,
} from "../../../../../../../../../../schemas/inventoryMovement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneInventoryMovementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-movements/:idInventoryMovement`,
    name: "read-one-inventory-movement",
    schemas: {
        body: v.object({
            idInventoryMovement: inventoryMovementSchema.entries.id,
            idYear: inventoryMovementSchema.entries.idYear,
        }),
        return: inventoryMovementSchemaReturn,
    },
})
