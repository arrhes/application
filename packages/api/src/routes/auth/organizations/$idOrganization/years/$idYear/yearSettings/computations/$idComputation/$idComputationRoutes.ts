import { computationIncomeStatementsRoutes } from "./computationIncomeStatements/computationIncomeStatementsRoutes.js"
import { deleteOneComputationRoute } from "./deleteOneComputation.js"
import { readOneComputationRoute } from "./readOneComputation.js"
import { updateOneComputationRoute } from "./updateOneComputation.js"

export const $idComputationRoutes = [
    deleteOneComputationRoute,
    updateOneComputationRoute,

    // computationIncomeStatementsRoutes must come before readOneComputation so that
    // .../computations/income-statements matches before .../computations/:idComputation
    ...computationIncomeStatementsRoutes,

    readOneComputationRoute,
]
