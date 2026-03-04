import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { toRoman } from "../../../../../../utilities/toRoman.ts"
import { getBalanceSheetChildren } from "../../../yearSettings/balanceSheets/getBalanceSheetChildren.tsx"
import { BalanceSheetAssetsReportRow } from "./balanceSheetAssetsReportRow.tsx"

export function BalanceSheetAssetsReportItem(props: {
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

    let grossTotalAmount = 0
    let amortizationTotalAmount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = account.idBalanceSheetAsset === props.balanceSheet.id
            const hasChildrenAccount = props.balanceSheetChildren.some(
                (balanceSheet) => balanceSheet.id === account.idBalanceSheetAsset,
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

            const accountBalance = accountTotalDebit - accountTotalCredit

            if (accountBalance < 0 && account.balanceSheetAssetFlow === "debit") {
                return
            }

            if (accountBalance > 0 && account.balanceSheetAssetFlow === "credit") {
                return
            }

            if (account.balanceSheetAssetColumn === "gross") {
                if (account.balanceSheetAssetFlow === "debit") {
                    grossTotalAmount += Math.abs(accountBalance)
                }
                if (account.balanceSheetAssetFlow === "credit") {
                    grossTotalAmount += -Math.abs(accountBalance)
                }
            }
            if (account.balanceSheetAssetColumn === "amortization") {
                if (account.balanceSheetAssetFlow === "debit") {
                    amortizationTotalAmount += Math.abs(accountBalance)
                }
                if (account.balanceSheetAssetFlow === "credit") {
                    amortizationTotalAmount += -Math.abs(accountBalance)
                }
            }
        })

    return (
        <Fragment>
            <BalanceSheetAssetsReportRow
                key={props.balanceSheet.id}
                level={props.level}
                number={number}
                label={label}
                grossAmount={grossTotalAmount}
                amortizationAmount={amortizationTotalAmount}
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
                        <BalanceSheetAssetsReportItem
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
