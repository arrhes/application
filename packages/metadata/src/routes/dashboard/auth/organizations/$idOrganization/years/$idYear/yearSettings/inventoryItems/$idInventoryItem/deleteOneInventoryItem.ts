import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { inventoryItemSchema } from "../../../../../../../../../../schemas/inventoryItem.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneInventoryItemRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-items/:idInventoryItem`,
    name: "delete-one-inventory-item",
    schemas: {
        body: v.object({
            idInventoryItem: inventoryItemSchema.entries.id,
            idYear: inventoryItemSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
