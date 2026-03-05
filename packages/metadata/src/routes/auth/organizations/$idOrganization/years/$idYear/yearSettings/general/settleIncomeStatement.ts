import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { accountSchema } from "../../../../../../../../schemas/account.js"
import { journalSchema } from "../../../../../../../../schemas/journal.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const settleIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/settle-income-statement`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idJournalClosing: v.nonNullable(journalSchema.entries.id, "Le journal doit être renseigné"),
            idAccountProfit: v.nonNullable(accountSchema.entries.id, "Le compte doit être renseigné"),
            idAccountLoss: v.nonNullable(accountSchema.entries.id, "Le compte doit être renseigné"),
        }),
        return: v.object({}),
    },
})
