import { generateBalanceSheetXmlRoute } from "./generateBalanceSheetXml.js"
import { generateFecRoute } from "./generateFec.js"
import { generateIncomeStatementXmlRoute } from "./generateIncomeStatementXml.js"

export const exportsRoutes = [
    generateBalanceSheetXmlRoute,
    generateFecRoute,
    generateIncomeStatementXmlRoute,
]
