import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Fragment, useMemo, useRef } from "react"
import type * as v from "valibot"
import { FormatNull } from "../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../components/layouts/table/table.tsx"

export function BalanceReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const sortedAccounts = useMemo(
        () => props.accounts.sort((a, b) => a.number.localeCompare(b.number)),
        [props.accounts],
    )

    const recordRowsByAccount = useMemo(() => {
        const map = new Map<string, Array<v.InferOutput<typeof returnedSchemas.recordRow>>>()
        for (const recordRow of props.recordRows) {
            const existing = map.get(recordRow.idAccount)
            if (existing) {
                existing.push(recordRow)
            } else {
                map.set(recordRow.idAccount, [recordRow])
            }
        }
        return map
    }, [props.recordRows])

    const accountsWithRows = useMemo(
        () => sortedAccounts.filter((account) => (recordRowsByAccount.get(account.id)?.length ?? 0) > 0),
        [sortedAccounts, recordRowsByAccount],
    )

    const accountData = useMemo(() => {
        let accountsTotalDebit = 0
        let accountsTotalCredit = 0
        let accountsTotalBalanceDebit = 0
        let accountsTotalBalanceCredit = 0

        const perAccount = new Map<
            string,
            {
                totalDebit: number
                totalCredit: number
                balanceDebit: number
                balanceCredit: number
            }
        >()

        for (const account of props.accounts) {
            const rows = recordRowsByAccount.get(account.id) ?? []
            let accountTotalDebit = 0
            let accountTotalCredit = 0

            for (const recordRow of rows) {
                accountTotalDebit += Number(recordRow.debit)
                accountTotalCredit += Number(recordRow.credit)
            }

            accountsTotalDebit += accountTotalDebit
            accountsTotalCredit += accountTotalCredit

            const algebricBalance = accountTotalDebit - accountTotalCredit

            const balanceDebit = algebricBalance > 0 ? Math.abs(algebricBalance) : 0
            const balanceCredit = algebricBalance < 0 ? Math.abs(algebricBalance) : 0

            accountsTotalBalanceDebit += balanceDebit
            accountsTotalBalanceCredit += balanceCredit

            if (rows.length > 0) {
                perAccount.set(account.id, {
                    totalDebit: accountTotalDebit,
                    totalCredit: accountTotalCredit,
                    balanceDebit,
                    balanceCredit,
                })
            }
        }

        return {
            totals: {
                debit: accountsTotalDebit,
                credit: accountsTotalCredit,
                balanceDebit: accountsTotalBalanceDebit,
                balanceCredit: accountsTotalBalanceCredit,
            },
            perAccount,
        }
    }, [props.accounts, recordRowsByAccount])

    const virtualizer = useVirtualizer({
        count: accountsWithRows.length,
        getScrollElement: () => scrollContainerRef.current,
        estimateSize: () => 45,
        measureElement: (element) => element.getBoundingClientRect().height,
        overscan: 5,
    })

    const virtualItems = virtualizer.getVirtualItems()

    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0
    const paddingBottom =
        virtualItems.length > 0 ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end : 0

    return (
        <div
            ref={scrollContainerRef}
            className={css({
                width: "100%",
                maxHeight: "[70vh]",
                overflowY: "auto",
            })}
        >
            <Table.Root>
                <Table.Header.Root>
                    <Table.Header.Row>
                        <Table.Header.Cell>
                            <span className={css({ color: "neutral/75", fontSize: "sm" })}>Compte</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell className={css({ width: "[1%]" })} align="right">
                            <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                                Débit
                            </span>
                        </Table.Header.Cell>
                        <Table.Header.Cell className={css({ width: "[1%]" })} align="right">
                            <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                                Crédit
                            </span>
                        </Table.Header.Cell>
                        <Table.Header.Cell className={css({ width: "[1%]" })} align="right">
                            <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                                Solde débiteur
                            </span>
                        </Table.Header.Cell>
                        <Table.Header.Cell className={css({ width: "[1%]" })} align="right">
                            <span className={css({ color: "neutral/75", fontSize: "sm", whiteSpace: "nowrap" })}>
                                Solde créditeur
                            </span>
                        </Table.Header.Cell>
                    </Table.Header.Row>
                </Table.Header.Root>
                <Table.Body.Root
                    className={css({ borderY: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}
                >
                    <Table.Body.Row>
                        <Table.Body.Cell align="right">
                            <span className={css({ color: "neutral/50" })}>Total</span>
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={accountData.totals.debit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={accountData.totals.credit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice
                                price={accountData.totals.balanceDebit}
                                className={css({ fontWeight: "bold" })}
                            />
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice
                                price={accountData.totals.balanceCredit}
                                className={css({ fontWeight: "bold" })}
                            />
                        </Table.Body.Cell>
                    </Table.Body.Row>
                </Table.Body.Root>
                {accountsWithRows.length === 0 ? (
                    <Table.Body.Root>
                        <Table.Body.Row>
                            <Table.Body.Cell>
                                <FormatNull />
                            </Table.Body.Cell>
                        </Table.Body.Row>
                    </Table.Body.Root>
                ) : (
                    <Fragment>
                        {paddingTop > 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={5} style={{ height: `${paddingTop}px`, padding: 0, border: 0 }} />
                                </tr>
                            </tbody>
                        )}
                        {virtualItems.map((virtualItem) => {
                            const account = accountsWithRows[virtualItem.index]
                            const data = accountData.perAccount.get(account.id)

                            return (
                                <Table.Body.Root
                                    key={virtualItem.key}
                                    data-index={virtualItem.index}
                                    ref={virtualizer.measureElement}
                                >
                                    <Table.Body.Row className={css({ borderColor: "neutral/5" })}>
                                        <Table.Body.Cell>
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "start",
                                                    alignItems: "start",
                                                    gap: "0.5rem",
                                                })}
                                            >
                                                <FormatText className={css({ overflow: "visible" })}>
                                                    {account.number}
                                                </FormatText>
                                                <FormatText wrap={true} className={css({ color: "neutral/50" })}>
                                                    {account.label}
                                                </FormatText>
                                            </div>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice price={data?.totalDebit ?? 0} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice price={data?.totalCredit ?? 0} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice price={data?.balanceDebit ?? 0} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice price={data?.balanceCredit ?? 0} />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                </Table.Body.Root>
                            )
                        })}
                        {paddingBottom > 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={5} style={{ height: `${paddingBottom}px`, padding: 0, border: 0 }} />
                                </tr>
                            </tbody>
                        )}
                    </Fragment>
                )}
            </Table.Root>
        </div>
    )
}
