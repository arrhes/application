import { $idIncomeStatementRoutes } from "./$idIncomeStatement/$idIncomeStatementRoutes.js"
import { createOneIncomeStatementRoute } from "./createOneIncomeStatement.js"
import { readAllIncomeStatementsRoute } from "./readAllIncomeStatements.js"

export const incomeStatementsRoutes = [
    createOneIncomeStatementRoute,
    readAllIncomeStatementsRoute,

    ...$idIncomeStatementRoutes,
]
