import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { getIncomeStatementChildren } from "./getIncomeStatementChildren.tsx"
import { IncomeStatementRow } from "./incomeStatementRow.tsx"

export function IncomeStatementItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatementChildren: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <Fragment>
            <IncomeStatementRow
                idOrganization={props.idOrganization}
                idYear={props.idYear}
                incomeStatement={props.incomeStatement}
                level={props.level}
            />
            {props.incomeStatementChildren
                .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === props.incomeStatement.id)
                .map((incomeStatement) => {
                    const children = getIncomeStatementChildren({
                        incomeStatement: incomeStatement,
                        incomeStatements: props.incomeStatementChildren,
                    })

                    return (
                        <IncomeStatementItem
                            key={incomeStatement.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            incomeStatement={incomeStatement}
                            incomeStatementChildren={children}
                            level={props.level + 1}
                        />
                    )
                })}
        </Fragment>
    )
}
