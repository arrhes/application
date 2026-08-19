import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { inventoryItemSchema, inventoryItemSchemaReturn } from "../../../../../../../../../../schemas/inventoryItem.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneInventoryItemRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/inventory-items/:idInventoryItem`,
    name: "update-one-inventory-item",
    schemas: {
        body: v.object({
            idInventoryItem: inventoryItemSchema.entries.id,
            idYear: inventoryItemSchema.entries.idYear,

            sku: v.optional(inventoryItemSchema.entries.sku),
            name: v.optional(inventoryItemSchema.entries.name),
            description: v.optional(inventoryItemSchema.entries.description),
            category: v.optional(inventoryItemSchema.entries.category),
            unit: v.optional(inventoryItemSchema.entries.unit),
            unitPrice: v.optional(inventoryItemSchema.entries.unitPrice),
            currentQuantity: v.optional(inventoryItemSchema.entries.currentQuantity),
            minimumThreshold: v.optional(inventoryItemSchema.entries.minimumThreshold),
            location: v.optional(inventoryItemSchema.entries.location),
        }),
        return: inventoryItemSchemaReturn,
    },
})
