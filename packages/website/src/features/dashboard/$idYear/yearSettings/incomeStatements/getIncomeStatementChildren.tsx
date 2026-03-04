import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"

export function getIncomeStatementChildren(parameters: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
}): Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> {
    if (parameters.incomeStatements.length === 0) return []

    const children = parameters.incomeStatements.filter(
        (incomeStatement) => incomeStatement.idIncomeStatementParent === parameters.incomeStatement.id,
    )

    return [
        ...children,
        ...children.flatMap((incomeStatement) =>
            getIncomeStatementChildren({
                incomeStatement: incomeStatement,
                incomeStatements: parameters.incomeStatements,
            }),
        ),
    ]
}
