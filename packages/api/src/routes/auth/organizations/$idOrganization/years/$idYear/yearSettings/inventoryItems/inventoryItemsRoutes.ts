import { $idInventoryItemRoutes } from "./$idInventoryItem/$idInventoryItemRoutes.js"
import { createOneInventoryItemRoute } from "./createOneInventoryItem.js"
import { readAllInventoryItemsRoute } from "./readAllInventoryItems.js"

export const inventoryItemsRoutes = [
    createOneInventoryItemRoute,
    readAllInventoryItemsRoute,

    ...$idInventoryItemRoutes,
]
