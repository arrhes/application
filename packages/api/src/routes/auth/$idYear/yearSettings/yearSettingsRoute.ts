import { accountsRoutes } from "./accounts/accountsRoutes.js"
import { balanceSheetsRoutes } from "./balanceSheets/balanceSheetsRoutes.js"
import { computationsRoutes } from "./computations/computationsRoutes.js"
import { generalRoutes } from "./general/generalRoutes.js"
import { incomeStatementsRoutes } from "./incomeStatements/incomeStatementsRoutes.js"
import { journalsRoutes } from "./journals/journalsRoutes.js"
import { recordLabelsRoutes } from "./recordLabels/recordLabelsRoutes.js"

export const yearSettingsRoute = [
    ...generalRoutes,
    ...accountsRoutes,
    ...journalsRoutes,
    ...balanceSheetsRoutes,
    ...incomeStatementsRoutes,
    ...computationsRoutes,
    ...recordLabelsRoutes,
]
