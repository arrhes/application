import type * as v from "valibot"

export type EntryTemplateLine = {
    idAccount: string
    label: string
    debit: string
    credit: string
    isComputedForJournalReport: boolean
    isComputedForLedgerReport: boolean
    isComputedForBalanceReport: boolean
    isComputedForBalanceSheetReport: boolean
    isComputedForIncomeStatementReport: boolean
}

export type EntryTemplateResult = {
    label: string
    entryLines: EntryTemplateLine[]
}

export type EntryTemplateDefinition<TSchema extends v.GenericSchema = v.GenericSchema> = {
    key: string
    label: string
    description: string
    schema: TSchema
    createEntries: (input: v.InferOutput<TSchema>) => EntryTemplateResult
}

export type AnyEntryTemplateDefinition = {
    key: string
    label: string
    description: string
    schema: v.GenericSchema
    createEntries: (input: any) => EntryTemplateResult
}

export function defineEntryTemplate<TSchema extends v.GenericSchema>(config: {
    key: string
    label: string
    description: string
    schema: TSchema
    createEntries: (input: v.InferOutput<TSchema>) => EntryTemplateResult
}): EntryTemplateDefinition<TSchema> {
    return config
}
