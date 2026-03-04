import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"

export function getBalanceSheetLevel(parameters: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    const map = new Map(parameters.balanceSheets.map((i) => [i.id, i]))

    let level = 0
    let current = parameters.balanceSheet
    while (current.idBalanceSheetParent && map.has(current.idBalanceSheetParent)) {
        current = map.get(current.idBalanceSheetParent)!
        level += 1
    }

    return level
}
