import type { returnedSchemas } from "@arrhes/application-metadata"
import { css, Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import type * as v from "valibot"
import { Table } from "../../components/table/table.js"
import { getBalanceSheetChildren } from "../getBalanceSheetChildren.js"
import { BalanceSheetLiabilitiesReportItem } from "./balanceSheetLiabilitiesReportItem.js"
import { BalanceSheetLiabilitiesReportRow } from "./balanceSheetLiabilitiesReportRow.js"

export function BalanceSheetLiabilitiesReportTable(props: {
    entryLines: Array<v.InferOutput<typeof returnedSchemas.entryLine>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}) {
    let netTotalAmount = 0
    props.accounts
        .filter((account) => account.idBalanceSheetLiability !== null)
        .forEach((account) => {
            let accountTotalDebit = 0
            let accountTotalCredit = 0

            props.entryLines
                .filter((entryLine) => entryLine.idAccount === account.id)
                .forEach((entryLine) => {
                    accountTotalDebit += Number(entryLine.debit)
                    accountTotalCredit += Number(entryLine.credit)
                })

            const accountBalance = accountTotalDebit - accountTotalCredit

            if (accountBalance < 0 && account.balanceSheetLiabilityFlow === "debit") {
                return
            }

            if (accountBalance > 0 && account.balanceSheetLiabilityFlow === "credit") {
                return
            }

            if (account.balanceSheetLiabilityColumn === "net") {
                if (account.balanceSheetLiabilityFlow === "debit") {
                    netTotalAmount += -Math.abs(accountBalance)
                }
                if (account.balanceSheetLiabilityFlow === "credit") {
                    netTotalAmount += Math.abs(accountBalance)
                }
            }
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
                                        entryLines={props.entryLines}
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
                        netAmount={Math.abs(netTotalAmount)}
                        isAmountDisplayed={true}
                    />
                </Table.Body.Root>
            </Table.Root>
        </>
    )
}
