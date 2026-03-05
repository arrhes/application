import { closeYearRoute } from "./closeYear.js"
import { deleteOneYearRoute } from "./deleteOneYear.js"
import { openYearRoute } from "./openYear.js"
import { settleBalanceSheetRoute } from "./settleBalanceSheet.js"
import { settleIncomeStatementRoute } from "./settleIncomeStatement.js"
import { updateOneYearRoute } from "./updateOneYear.js"

export const generalRoutes = [
    closeYearRoute,
    deleteOneYearRoute,
    openYearRoute,
    settleBalanceSheetRoute,
    settleIncomeStatementRoute,
    updateOneYearRoute,
]
