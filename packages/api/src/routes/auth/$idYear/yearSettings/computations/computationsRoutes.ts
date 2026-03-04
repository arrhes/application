import { $idComputationRoutes } from "./$idComputation/$idComputationRoutes.js"
import { createOneComputationRoute } from "./createOneComputation.js"
import { readAllComputationsRoute } from "./readAllComputations.js"

export const computationsRoutes = [
    createOneComputationRoute,
    readAllComputationsRoute,

    ...$idComputationRoutes,
]
