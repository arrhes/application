import { deleteOneIncomeStatementRoute } from "./deleteOneIncomeStatement.js"
import { readOneIncomeStatementRoute } from "./readOneIncomeStatement.js"
import { updateOneIncomeStatementRoute } from "./updateOneIncomeStatement.js"

export const $idIncomeStatementRoutes = [
    deleteOneIncomeStatementRoute,
    readOneIncomeStatementRoute,
    updateOneIncomeStatementRoute,
]
