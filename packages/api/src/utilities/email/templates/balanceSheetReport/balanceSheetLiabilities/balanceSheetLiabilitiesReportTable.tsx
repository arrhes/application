import type { returnedSchemas } from "@arrhes/application-metadata"
import { css, Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import type * as v from "valibot"
import { Table } from "../../components/table/table.js"
import { getBalanceSheetChildren } from "../getBalanceSheetChildren.js"
import { BalanceSheetLiabilitiesReportItem } from "./balanceSheetLiabilitiesReportItem.js"
import { BalanceSheetLiabilitiesReportRow } from "./balanceSheetLiabilitiesReportRow.js"

export function BalanceSheetLiabilitiesReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    let netTotalAmount = 0
    props.accounts
        .filter((account) => account.idBalanceSheetLiability !== null)
        .forEach((account) => {
            props.recordRows
                .filter((recordRow) => recordRow.idAccount === account.id)
                .forEach((recordRow) => {
                    const debit = Number(recordRow.debit)
                    const credit = Number(recordRow.credit)

                    netTotalAmount += debit - credit
                })
        })

    return (
        <>
            <Style />
            <Table.Root>
                <Table.Header.Root>
                    <Table.Header.Row>
                        <Table.Header.Cell>
                            <span class={css`color: #333333;`}>PASSIF</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell align="right"></Table.Header.Cell>
                        <Table.Header.Cell align="right"></Table.Header.Cell>
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
                                    <BalanceSheetLiabilitiesReportItem
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
                    <BalanceSheetLiabilitiesReportRow
                        level={0}
                        number={" "}
                        label={"Total"}
                        netAmount={netTotalAmount}
                        isAmountDisplayed={true}
                    />
                </Table.Body.Root>
            </Table.Root>
        </>
    )
}
