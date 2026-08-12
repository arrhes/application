import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { toRoman } from "../../../../../../utilities/toRoman.ts"
import { getBalanceSheetChildren } from "../../../yearSettings/balanceSheets/getBalanceSheetChildren.tsx"
import { BalanceSheetAssetsReportRow } from "./BalanceSheetAssetsReportRow.tsx"

export function BalanceSheetAssetsReportItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    entryLines: Array<v.InferOutput<typeof returnedSchemas.entryLine>>
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
    for (const account of props.accounts) {
        const hasAccount = account.idBalanceSheetAsset === props.balanceSheet.id
        const hasChildrenAccount = props.balanceSheetChildren.some(
            (balanceSheet) => balanceSheet.id === account.idBalanceSheetAsset,
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

        if (accountBalance < 0 && account.balanceSheetAssetFlow === "debit") {
            continue
        }

        if (accountBalance > 0 && account.balanceSheetAssetFlow === "credit") {
            continue
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
    }

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
            {(() => {
                const children: Array<React.JSX.Element> = []
                for (const balanceSheet of props.balanceSheetChildren) {
                    if (balanceSheet.idBalanceSheetParent !== props.balanceSheet.id) continue
                    const balanceSheetChildren = getBalanceSheetChildren({
                        balanceSheet: balanceSheet,
                        balanceSheets: props.balanceSheetChildren,
                    })

                    children.push(
                        <BalanceSheetAssetsReportItem
                            key={balanceSheet.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            accounts={props.accounts}
                            entryLines={props.entryLines}
                            balanceSheet={balanceSheet}
                            balanceSheetChildren={balanceSheetChildren}
                            level={props.level + 1}
                        />,
                    )
                }
                return children
            })()}
        </Fragment>
    )
}
