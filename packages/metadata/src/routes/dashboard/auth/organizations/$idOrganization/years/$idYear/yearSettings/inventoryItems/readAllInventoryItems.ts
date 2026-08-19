import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { inventoryItemSchema, inventoryItemSchemaReturn } from "../../../../../../../../../schemas/inventoryItem.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllInventoryItemsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-items`,
    name: "read-all-inventory-items",
    schemas: {
        body: v.object({
            idYear: inventoryItemSchema.entries.idYear,
        }),
        return: v.array(inventoryItemSchemaReturn),
    },
})
