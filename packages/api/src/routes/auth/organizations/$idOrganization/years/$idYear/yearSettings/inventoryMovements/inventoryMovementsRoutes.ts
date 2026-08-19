import { $idInventoryMovementRoutes } from "./$idInventoryMovement/$idInventoryMovementRoutes.js"
import { createOneInventoryMovementRoute } from "./createOneInventoryMovement.js"
import { readAllInventoryMovementsRoute } from "./readAllInventoryMovements.js"

export const inventoryMovementsRoutes = [
    createOneInventoryMovementRoute,
    readAllInventoryMovementsRoute,

    ...$idInventoryMovementRoutes,
]
