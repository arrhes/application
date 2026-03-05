import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { toRoman } from "../../../../../../utilities/toRoman.ts"
import { getBalanceSheetChildren } from "../../../yearSettings/balanceSheets/getBalanceSheetChildren.tsx"
import { BalanceSheetLiabilitiesReportRow } from "./balanceSheetLiabilityiesReportRow.tsx"

export function BalanceSheetLiabilitiesReportItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheetChildren: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    const number = props.level === 0 ? toRoman(Number(props.balanceSheet.number)) : null

    const label = props.balanceSheet.label

    const isAmountDisplayed = props.balanceSheet.isComputed === true || props.balanceSheetChildren.length === 0

    let netTotalAmount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = account.idBalanceSheetLiability === props.balanceSheet.id
            const hasChildrenAccount = props.balanceSheetChildren.some(
                (balanceSheet) => balanceSheet.id === account.idBalanceSheetLiability,
            )
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            let accountTotalDebit = 0
            let accountTotalCredit = 0

            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    accountTotalDebit += Number(recordRow.debit)
                    accountTotalCredit += Number(recordRow.credit)
                })

            const accountBalance = accountTotalCredit - accountTotalDebit

            if (accountBalance > 0 && account.balanceSheetLiabilityFlow === "debit") {
                return
            }

            if (accountBalance < 0 && account.balanceSheetLiabilityFlow === "credit") {
                return
            }

            if (account.balanceSheetLiabilityColumn === "net") {
                if (account.balanceSheetLiabilityFlow === "debit") {
                    netTotalAmount += accountBalance
                }
                if (account.balanceSheetLiabilityFlow === "credit") {
                    netTotalAmount += accountBalance
                }
            }
        })

    return (
        <Fragment>
            <BalanceSheetLiabilitiesReportRow
                key={props.balanceSheet.id}
                level={props.level}
                number={number}
                label={label}
                netAmount={netTotalAmount}
                isAmountDisplayed={isAmountDisplayed}
            />
            {props.balanceSheetChildren
                .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === props.balanceSheet.id)
                .map((balanceSheet) => {
                    const balanceSheetChildren = getBalanceSheetChildren({
                        balanceSheet: balanceSheet,
                        balanceSheets: props.balanceSheetChildren,
                    })

                    return (
                        <BalanceSheetLiabilitiesReportItem
                            key={balanceSheet.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            accounts={props.accounts}
                            recordRows={props.recordRows}
                            balanceSheet={balanceSheet}
                            balanceSheetChildren={balanceSheetChildren}
                            level={props.level + 1}
                        />
                    )
                })}
        </Fragment>
    )
}
