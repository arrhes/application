import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../schemas/record.js"
import { recordRowSchema } from "../../../../../../../schemas/recordRow.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneRecordFromTemplateRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record-from-template`,
    schemas: {
        body: v.object({
            idYear: recordSchema.entries.idYear,
            idJournal: v.optional(recordSchema.entries.idJournal),
            idRecordLabel: v.optional(recordSchema.entries.idRecordLabel),
            idFile: v.optional(recordSchema.entries.idFile),
            label: recordSchema.entries.label,
            date: recordSchema.entries.date,
            rows: v.array(
                v.object({
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
            ),
        }),
        return: recordSchemaReturn,
    },
})
