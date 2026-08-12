import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import type * as v from "valibot"

export type AccountTotals = {
    totalDebit: number
    totalCredit: number
}

export function getAccountTotals(
    entryLines: Array<v.InferOutput<typeof returnedSchemas.entryLine>>,
): Map<string, AccountTotals> {
    const map = new Map<string, AccountTotals>()
    for (const entryLine of entryLines) {
        const existing = map.get(entryLine.idAccount)
        if (existing) {
            existing.totalDebit += Number(entryLine.debit)
            existing.totalCredit += Number(entryLine.credit)
        } else {
            map.set(entryLine.idAccount, {
                totalDebit: Number(entryLine.debit),
                totalCredit: Number(entryLine.credit),
            })
        }
    }
    return map
}
