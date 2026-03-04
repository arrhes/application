import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"

export function getIncomeStatementLevel(parameters: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
}) {
    const map = new Map(parameters.incomeStatements.map((i) => [i.id, i]))

    let level = 0
    let current = parameters.incomeStatement
    while (current.idIncomeStatementParent && map.has(current.idIncomeStatementParent)) {
        current = map.get(current.idIncomeStatementParent)!
        level += 1
    }

    return level
}
