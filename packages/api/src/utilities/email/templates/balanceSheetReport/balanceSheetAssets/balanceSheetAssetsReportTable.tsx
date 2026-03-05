import type { returnedSchemas } from "@arrhes/application-metadata"
import { css, Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import type * as v from "valibot"
import { Table } from "../../components/table/table.js"
import { getBalanceSheetChildren } from "../getBalanceSheetChildren.js"
import { BalanceSheetAssetsReportItem } from "./balanceSheetAssetsReportItem.js"
import { BalanceSheetAssetsReportRow } from "./balanceSheetAssetsReportRow.js"

export function BalanceSheetAssetsReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    let grossTotalAmount = 0
    let amortizationTotalAmount = 0
    props.accounts
        .filter((account) => account.idBalanceSheetAsset !== null)
        .forEach((account) => {
            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    const debit = Number(recordRow.debit)
                    const credit = Number(recordRow.credit)

                    if (account.balanceSheetAssetColumn === "gross") {
                        grossTotalAmount += debit - credit
                    }
                    if (account.balanceSheetAssetColumn === "amortization") {
                        amortizationTotalAmount += debit - credit
                    }
                })
        })

    return (
        <>
            <Style />
            <Table.Root>
                <Table.Header.Root>
                    <Table.Header.Row>
                        <Table.Header.Cell>
                            <span class={css`color: #333333;`}>ACTIF</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right">
                            <span class={css`color: #333333;`}>Brut</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right">
                            <span class={css`color: #333333; font-size: 0.75rem;`}>Amortissements & dépréciations</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right">
                            <span class={css`color: #333333;`}>Net</span>
                        </Table.Header.Cell>
                    </Table.Header.Row>
                </Table.Header.Root>
                <Table.Body.Root>
                    <Fragment>
                        {props.balanceSheets
                            .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === null)
                            .sort((a, b) => Number(a.number) - Number(b.number))
                            .map((balanceSheet) => {
                                const balanceSheetChildren = getBalanceSheetChildren({
                                    balanceSheet: balanceSheet,
                                    balanceSheets: props.balanceSheets,
                                })

                                return (
                                    <BalanceSheetAssetsReportItem
                                        key={balanceSheet.id}
                                        accounts={props.accounts}
                                        recordRows={props.recordRows}
                                        balanceSheet={balanceSheet}
                                        balanceSheetChildren={balanceSheetChildren}
                                        level={0}
                                    />
                                )
                            })}
                    </Fragment>
                    <BalanceSheetAssetsReportRow
                        level={0}
                        number={" "}
                        label={"Total"}
                        grossAmount={Math.abs(grossTotalAmount)}
                        amortizationAmount={-Math.abs(amortizationTotalAmount)}
                        isAmountDisplayed={true}
                    />
                </Table.Body.Root>
            </Table.Root>
        </>
    )
}
