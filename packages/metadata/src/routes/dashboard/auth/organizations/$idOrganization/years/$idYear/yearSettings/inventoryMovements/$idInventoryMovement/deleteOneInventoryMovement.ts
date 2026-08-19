import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { inventoryMovementSchema } from "../../../../../../../../../../schemas/inventoryMovement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneInventoryMovementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-movements/:idInventoryMovement`,
    name: "delete-one-inventory-movement",
    schemas: {
        body: v.object({
            idInventoryMovement: inventoryMovementSchema.entries.id,
            idYear: inventoryMovementSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
