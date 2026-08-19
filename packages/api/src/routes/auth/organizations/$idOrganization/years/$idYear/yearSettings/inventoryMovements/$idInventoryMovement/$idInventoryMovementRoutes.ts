import { deleteOneInventoryMovementRoute } from "./deleteOneInventoryMovement.js"
import { readOneInventoryMovementRoute } from "./readOneInventoryMovement.js"
import { updateOneInventoryMovementRoute } from "./updateOneInventoryMovement.js"

export const $idInventoryMovementRoutes = [
    deleteOneInventoryMovementRoute,
    readOneInventoryMovementRoute,
    updateOneInventoryMovementRoute,
]
