import { computationIncomeStatementsRoutes } from "./computationIncomeStatements/computationIncomeStatementsRoutes.js"
import { deleteOneComputationRoute } from "./deleteOneComputation.js"
import { readOneComputationRoute } from "./readOneComputation.js"
import { updateOneComputationRoute } from "./updateOneComputation.js"

export const $idComputationRoutes = [
    deleteOneComputationRoute,
    readOneComputationRoute,
    updateOneComputationRoute,

    ...computationIncomeStatementsRoutes,
]
