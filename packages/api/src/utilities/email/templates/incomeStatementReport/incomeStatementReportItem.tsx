import type { returnedSchemas } from "@arrhes/application-metadata"
import { Fragment } from "hono/jsx/jsx-runtime"
import type * as v from "valibot"
import { numberToRomanString } from "../../../numberToRomanString.js"
import { getIncomeStatementChildren } from "./getIncomeStatementChildren.js"
import { IncomeStatementReportRow } from "./incomeStatementReportRow.js"

export function IncomeStatementReportItem(props: {
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    incomeStatementChildren: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>>
    level: number
}) {
    const number = props.level === 0 ? numberToRomanString(Number(props.incomeStatement.number)) : null

    const label = props.incomeStatement.label

    const isAmountDisplayed = props.incomeStatement.isComputed === true || props.incomeStatementChildren.length === 0

    let amount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = props.incomeStatement.id === account.idIncomeStatement
            const hasChildrenAccount = props.incomeStatementChildren.some(
                (incomeStatement) => incomeStatement.id === account.idIncomeStatement,
            )
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    amount += Number(recordRow.debit) - Number(recordRow.credit)
                })
        })

    return (
        <Fragment>
            <IncomeStatementReportRow
                key={props.incomeStatement.id}
                level={props.level}
                number={number}
                label={label}
                amount={Math.abs(amount)}
                isAmountDisplayed={isAmountDisplayed}
            />
            {props.incomeStatementChildren
                .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === props.incomeStatement.id)
                .map((incomeStatement) => {
                    const incomeStatementChildren = getIncomeStatementChildren({
                        incomeStatement: incomeStatement,
                        incomeStatements: props.incomeStatementChildren,
                    })

                    return (
                        <IncomeStatementReportItem
                            key={incomeStatement.id}
                            accounts={props.accounts}
                            recordRows={props.recordRows}
                            incomeStatement={incomeStatement}
                            incomeStatementChildren={incomeStatementChildren}
                            level={props.level + 1}
                        />
                    )
                })}
        </Fragment>
    )
}
