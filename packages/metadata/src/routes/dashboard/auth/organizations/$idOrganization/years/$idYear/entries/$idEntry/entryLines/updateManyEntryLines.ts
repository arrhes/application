import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { entryLineSchema } from "../../../../../../../../../../schemas/entryLine.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateManyEntryLinesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-many-entry-lines`,
    schemas: {
        body: v.object({
            idEntry: entryLineSchema.entries.idEntry,
            idYear: entryLineSchema.entries.idYear,

            isComputedForJournalReport: v.optional(entryLineSchema.entries.isComputedForJournalReport),
            isComputedForLedgerReport: v.optional(entryLineSchema.entries.isComputedForLedgerReport),
            isComputedForBalanceReport: v.optional(entryLineSchema.entries.isComputedForBalanceReport),
            isComputedForBalanceSheetReport: v.optional(entryLineSchema.entries.isComputedForBalanceSheetReport),
            isComputedForIncomeStatementReport: v.optional(entryLineSchema.entries.isComputedForIncomeStatementReport),
            label: v.optional(entryLineSchema.entries.label),
        }),
        return: v.array(entryLineSchema),
    },
})
