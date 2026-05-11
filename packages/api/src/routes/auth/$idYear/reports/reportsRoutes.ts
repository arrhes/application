import { generateBalanceSheetXmlRoute } from "./generateBalanceSheetXml.js"
import { generateIncomeStatementXmlRoute } from "./generateIncomeStatementXml.js"

export const reportsRoutes = [
    generateBalanceSheetXmlRoute,
    generateIncomeStatementXmlRoute,
]
