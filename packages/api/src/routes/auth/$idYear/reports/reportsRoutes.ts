import { documentsRoutes } from "./document/documentsRoutes.js"
import { generateBalanceSheetReportDocumentRoute } from "./generateBalanceSheetReportDocument.js"
import { generateIncomeStatementReportDocumentRoute } from "./generateIncomeStatementReportDocument.js"

export const reportsRoutes = [
    generateIncomeStatementReportDocumentRoute,
    generateBalanceSheetReportDocumentRoute,

    ...documentsRoutes,
]
