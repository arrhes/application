import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { inventoryItemSchema, inventoryItemSchemaReturn } from "../../../../../../../../../schemas/inventoryItem.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneInventoryItemRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-items`,
    name: "create-one-inventory-item",
    schemas: {
        body: v.object({
            idYear: inventoryItemSchema.entries.idYear,

            sku: v.optional(inventoryItemSchema.entries.sku),
            name: inventoryItemSchema.entries.name,
            description: v.optional(inventoryItemSchema.entries.description),
            category: v.optional(inventoryItemSchema.entries.category),
            unit: inventoryItemSchema.entries.unit,
            unitPrice: v.optional(inventoryItemSchema.entries.unitPrice),
            currentQuantity: v.optional(inventoryItemSchema.entries.currentQuantity),
            minimumThreshold: v.optional(inventoryItemSchema.entries.minimumThreshold),
            location: v.optional(inventoryItemSchema.entries.location),
        }),
        return: inventoryItemSchemaReturn,
    },
})
