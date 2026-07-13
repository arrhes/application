import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { inventoryItemSchema, inventoryItemSchemaReturn } from "../../../../../../../../../../schemas/inventoryItem.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneInventoryItemRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-items/:idInventoryItem`,
    name: "read-one-inventory-item",
    schemas: {
        body: v.object({
            idInventoryItem: inventoryItemSchema.entries.id,
            idYear: inventoryItemSchema.entries.idYear,
        }),
        return: inventoryItemSchemaReturn,
    },
})
