import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { toRoman } from "../../../../../utilities/toRoman.ts"
import { getIncomeStatementChildren } from "../../yearSettings/incomeStatements/getIncomeStatementChildren.tsx"
import { IncomeStatementReportRow } from "./IncomeStatementReportRow.tsx"

export function IncomeStatementReportItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    entryLines: Array<v.InferOutput<typeof returnedSchemas.entryLine>>
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatementChildren: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    const number = props.level === 0 ? toRoman(Number(props.incomeStatement.number)) : null

    const label = props.incomeStatement.label

    const isAmountDisplayed = props.incomeStatement.isComputed === true || props.incomeStatementChildren.length === 0

    let netAmount = 0
    for (const account of props.accounts) {
        const hasAccount = props.incomeStatement.id === account.idIncomeStatement
        const hasChildrenAccount = props.incomeStatementChildren.some(
            (incomeStatement) => incomeStatement.id === account.idIncomeStatement,
        )
        if (!hasAccount && !hasChildrenAccount) continue

        let accountTotalDebit = 0
        let accountTotalCredit = 0

        for (const entryLine of props.entryLines) {
            if (entryLine.idAccount !== account.id) continue
            accountTotalDebit += Number(entryLine.debit)
            accountTotalCredit += Number(entryLine.credit)
        }

        const accountBalance = accountTotalDebit - accountTotalCredit

        netAmount += Math.abs(accountBalance)
    }

    return (
        <Fragment>
            <IncomeStatementReportRow
                key={props.incomeStatement.id}
                level={props.level}
                number={number}
                label={label}
                amount={netAmount}
                isAmountDisplayed={isAmountDisplayed}
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
                        <IncomeStatementReportItem
                            key={incomeStatement.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            accounts={props.accounts}
                            entryLines={props.entryLines}
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
