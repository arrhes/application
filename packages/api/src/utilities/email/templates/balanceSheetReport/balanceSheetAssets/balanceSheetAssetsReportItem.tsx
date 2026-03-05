import type { returnedSchemas } from "@arrhes/application-metadata"
import { Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import type * as v from "valibot"
import { numberToRomanString } from "../../../../numberToRomanString.js"
import { getBalanceSheetChildren } from "../getBalanceSheetChildren.js"
import { BalanceSheetAssetsReportRow } from "./balanceSheetAssetsReportRow.js"

export function BalanceSheetAssetsReportItem(props: {
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheetChildren: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    level: number
}) {
    const number = props.level === 0 ? numberToRomanString(Number(props.balanceSheet.number)) : null

    const label = props.balanceSheet.label

    const isAmountDisplayed = props.balanceSheet.isComputed === true || props.balanceSheetChildren.length === 0

    let grossAmount = 0
    let amortizationAmount = 0
    props.accounts
        .filter((account) => {
            const hasAccount = account.idBalanceSheetAsset === props.balanceSheet.id
            const hasChildrenAccount = props.balanceSheetChildren.some(
                (balanceSheet) => balanceSheet.id === account.idBalanceSheetAsset,
            )
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    const debit = Number(recordRow.debit)
                    const credit = Number(recordRow.credit)

                    if (account.balanceSheetAssetColumn === "gross") {
                        grossAmount += debit - credit
                    }
                    if (account.balanceSheetAssetColumn === "amortization") {
                        amortizationAmount += debit - credit
                    }
                })
        })

    return (
        <Fragment>
            <Style />
            <BalanceSheetAssetsReportRow
                key={props.balanceSheet.id}
                level={props.level}
                number={number}
                label={label}
                grossAmount={Math.abs(grossAmount)}
                amortizationAmount={-Math.abs(amortizationAmount)}
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
