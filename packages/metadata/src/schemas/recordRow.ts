import * as v from "valibot"
import { booleanSchema, dateTimeSchema, numericSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { recordRowModel } from "../models/recordRow.js"

export const recordRowSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idRecord: v.nonNullable(idSchema, "Ce champ est requis"),
    idAccount: v.nonNullable(idSchema, "Ce champ est requis"),
    flag: v.nullable(stringSchema),
    isComputedForJournalReport: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputedForLedgerReport: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputedForBalanceReport: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputedForBalanceSheetReport: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputedForIncomeStatementReport: v.nonNullable(booleanSchema, "Ce champ est requis"),
    label: v.nullable(varcharSchema({ maxLength: 256 })),
    debit: v.nonNullable(numericSchema, "Ce champ est requis"),
    credit: v.nonNullable(numericSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordRowModel.$inferSelect>

export const recordRowSchemaReturn = v.pick(recordRowSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idRecord",
    "idAccount",
    "flag",
    "isComputedForJournalReport",
    "isComputedForLedgerReport",
    "isComputedForBalanceReport",
    "isComputedForBalanceSheetReport",
    "isComputedForIncomeStatementReport",
    "label",
    "debit",
    "credit",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
