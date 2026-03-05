import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { recordRowSchema, recordRowSchemaReturn } from "../../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-record-row`,
    schemas: {
        body: v.object({
            idRecordRow: recordRowSchema.entries.id,
            idYear: recordRowSchema.entries.idYear,
            idRecord: v.optional(recordRowSchema.entries.idRecord),
            idAccount: v.optional(recordRowSchema.entries.idAccount),
            isComputedForJournalReport: v.optional(recordRowSchema.entries.isComputedForJournalReport),
            isComputedForLedgerReport: v.optional(recordRowSchema.entries.isComputedForLedgerReport),
            isComputedForBalanceReport: v.optional(recordRowSchema.entries.isComputedForBalanceReport),
            isComputedForBalanceSheetReport: v.optional(recordRowSchema.entries.isComputedForBalanceSheetReport),
            isComputedForIncomeStatementReport: v.optional(recordRowSchema.entries.isComputedForIncomeStatementReport),
            label: v.optional(recordRowSchema.entries.label),
            debit: v.optional(recordRowSchema.entries.debit),
            credit: v.optional(recordRowSchema.entries.credit),
        }),
        return: recordRowSchemaReturn,
    },
})
