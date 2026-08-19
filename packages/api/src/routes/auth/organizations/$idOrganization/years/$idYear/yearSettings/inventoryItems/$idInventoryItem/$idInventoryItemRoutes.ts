import { deleteOneInventoryItemRoute } from "./deleteOneInventoryItem.js"
import { readOneInventoryItemRoute } from "./readOneInventoryItem.js"
import { updateOneInventoryItemRoute } from "./updateOneInventoryItem.js"

export const $idInventoryItemRoutes = [
    deleteOneInventoryItemRoute,
    readOneInventoryItemRoute,
    updateOneInventoryItemRoute,
]
