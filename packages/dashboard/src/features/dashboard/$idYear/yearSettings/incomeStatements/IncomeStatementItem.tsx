import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { getIncomeStatementChildren } from "./getIncomeStatementChildren.tsx"
import { IncomeStatementRow } from "./IncomeStatementRow.tsx"

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
            {(() => {
                const children: Array<React.JSX.Element> = []
                for (const incomeStatement of props.incomeStatementChildren) {
                    if (incomeStatement.idIncomeStatementParent !== props.incomeStatement.id) continue
                    const incomeStatementChildren = getIncomeStatementChildren({
                        incomeStatement: incomeStatement,
                        incomeStatements: props.incomeStatementChildren,
                    })

                    children.push(
                        <IncomeStatementItem
                            key={incomeStatement.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            incomeStatement={incomeStatement}
                            incomeStatementChildren={incomeStatementChildren}
                            level={props.level + 1}
                        />,
                    )
                }
                return children
            })()}
        </Fragment>
    )
}
