import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { recordRowSchema, recordRowSchemaReturn } from "../../../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneRecordRowRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record-row`,
    schemas: {
        body: v.object({
            idYear: recordRowSchema.entries.idYear,
            idRecord: recordRowSchema.entries.idRecord,
            idAccount: recordRowSchema.entries.idAccount,
            isComputedForJournalReport: recordRowSchema.entries.isComputedForJournalReport,
            isComputedForLedgerReport: recordRowSchema.entries.isComputedForLedgerReport,
            isComputedForBalanceReport: recordRowSchema.entries.isComputedForBalanceReport,
            isComputedForBalanceSheetReport: recordRowSchema.entries.isComputedForBalanceSheetReport,
            isComputedForIncomeStatementReport: recordRowSchema.entries.isComputedForIncomeStatementReport,
            label: v.optional(recordRowSchema.entries.label),
            debit: v.optional(recordRowSchema.entries.debit),
            credit: v.optional(recordRowSchema.entries.credit),
        }),
        return: recordRowSchemaReturn,
    },
})
