import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordRowSchema } from "../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateManyRecordRowsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-many-record-rows`,
    schemas: {
        body: v.object({
            idRecord: recordRowSchema.entries.idRecord,
            idYear: recordRowSchema.entries.idYear,

            isComputedForJournalReport: v.optional(recordRowSchema.entries.isComputedForJournalReport),
            isComputedForLedgerReport: v.optional(recordRowSchema.entries.isComputedForLedgerReport),
            isComputedForBalanceReport: v.optional(recordRowSchema.entries.isComputedForBalanceReport),
            isComputedForBalanceSheetReport: v.optional(recordRowSchema.entries.isComputedForBalanceSheetReport),
            isComputedForIncomeStatementReport: v.optional(recordRowSchema.entries.isComputedForIncomeStatementReport),
            label: v.optional(recordRowSchema.entries.label),
        }),
        return: v.array(recordRowSchema),
    },
})
