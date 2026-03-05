import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { journalSchema } from "../../../../../../../../schemas/journal.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const settleBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/settle-balance-sheet`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idJournalClosing: v.nonNullable(journalSchema.entries.id, "Le journal doit être renseigné"),
        }),
        return: v.object({}),
    },
})
