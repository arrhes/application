import { $idBalanceSheetRoutes } from "./$idBalanceSheet/$idBalanceSheetRoutes.js"
import { createOneBalanceSheetRoute } from "./createOneBalanceSheet.js"
import { readAllBalanceSheetsRoute } from "./readAllBalanceSheets.js"

export const balanceSheetsRoutes = [
    createOneBalanceSheetRoute,
    readAllBalanceSheetsRoute,

    ...$idBalanceSheetRoutes,
]
