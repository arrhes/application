import { $idComputationIncomeStatementRoutes } from "./$idComputationIncomeStatement/$idComputationIncomeStatementRoutes.js"
import { createOneComputationIncomeStatementRoute } from "./createOneComputationIncomeStatement.js"
import { readAllComputationIncomeStatementsRoute } from "./readAllComputationIncomeStatements.js"

export const computationIncomeStatementsRoutes = [
    createOneComputationIncomeStatementRoute,
    readAllComputationIncomeStatementsRoute,

    ...$idComputationIncomeStatementRoutes,
]
