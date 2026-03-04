import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Fragment, useMemo, useRef } from "react"
import type * as v from "valibot"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../../../../components/layouts/table/table.tsx"

export function LedgerReportTable(props: {
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
}) {
    const accountsTotalDebit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    const accountsTotalCredit = props.recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const sortedAccounts = useMemo(() => {
        const recordRowsByAccount = new Map<string, Array<v.InferOutput<typeof returnedSchemas.recordRow>>>()
        for (const recordRow of props.recordRows) {
            let rows = recordRowsByAccount.get(recordRow.idAccount)
            if (!rows) {
                rows = []
                recordRowsByAccount.set(recordRow.idAccount, rows)
            }
            rows.push(recordRow)
        }

        return [...props.accounts]
            .sort((a, b) => a.number.localeCompare(b.number))
            .filter((account) => recordRowsByAccount.has(account.id))
    }, [props.accounts, props.recordRows])

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: sortedAccounts.length,
        getScrollElement: () => scrollContainerRef.current,
        estimateSize: () => 120,
        measureElement: (element) => element.getBoundingClientRect().height,
        overscan: 3,
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
                        <Table.Header.Cell>
                            <span className={css({ color: "neutral/75", fontSize: "sm" })}>Libellé</span>
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
                    </Table.Header.Row>
                </Table.Header.Root>
                <Table.Body.Root
                    className={css({ borderY: "1px solid token(colors.neutral/20)", _last: { borderBottom: "0" } })}
                >
                    <Table.Body.Row className={css({ backgroundColor: "background" })}>
                        <Table.Body.Cell colSpan={1} />
                        <Table.Body.Cell align="right">
                            <span className={css({ color: "neutral/50" })}>Total</span>
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={accountsTotalDebit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={accountsTotalCredit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                    </Table.Body.Row>
                </Table.Body.Root>
                {sortedAccounts.length === 0 ? (
                    <Table.Body.Root
                        className={css({
                            borderBottom: "1px solid token(colors.neutral/10)",
                            _last: { borderBottom: "0" },
                        })}
                    >
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
                                    <td colSpan={4} style={{ height: `${paddingTop}px`, padding: 0, border: 0 }} />
                                </tr>
                            </tbody>
                        )}
                        {virtualItems.map((virtualItem) => {
                            const account = sortedAccounts[virtualItem.index]
                            const filteredRecordRows = props.recordRows.filter(
                                (recordRow) => recordRow.idAccount === account.id,
                            )

                            const accountTotalDebit = filteredRecordRows.reduce(
                                (acc, recordRow) => acc + Number(recordRow.debit),
                                0,
                            )
                            const accountTotalCredit = filteredRecordRows.reduce(
                                (acc, recordRow) => acc + Number(recordRow.credit),
                                0,
                            )

                            return (
                                <Table.Body.Root
                                    key={virtualItem.key}
                                    data-index={virtualItem.index}
                                    ref={virtualizer.measureElement}
                                    className={css({
                                        borderY: "1px solid token(colors.neutral/10)",
                                        _last: { borderBottom: "0" },
                                    })}
                                >
                                    <Table.Body.Row
                                        className={css({ borderColor: "neutral/10", backgroundColor: "background" })}
                                    >
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
                                        <Table.Body.Cell />
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={accountTotalDebit}
                                                className={css({ fontWeight: "bold" })}
                                            />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={accountTotalCredit}
                                                className={css({ fontWeight: "bold" })}
                                            />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                    {/* biome-ignore lint/complexity/noUselessFragments: Fragment needed for TypeScript type compatibility with Table.Body.Root children */}
                                    <Fragment>
                                        {filteredRecordRows.map((recordRow) => {
                                            return (
                                                <Table.Body.Row
                                                    key={recordRow.id}
                                                    className={css({ borderColor: "neutral/5" })}
                                                >
                                                    <Table.Body.Cell />
                                                    <Table.Body.Cell>
                                                        <FormatText wrap={true}>{recordRow.label}</FormatText>
                                                    </Table.Body.Cell>
                                                    <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                                        <FormatPrice price={recordRow.debit} />
                                                    </Table.Body.Cell>
                                                    <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                                        <FormatPrice price={recordRow.credit} />
                                                    </Table.Body.Cell>
                                                </Table.Body.Row>
                                            )
                                        })}
                                    </Fragment>
                                </Table.Body.Root>
                            )
                        })}
                        {paddingBottom > 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={4} style={{ height: `${paddingBottom}px`, padding: 0, border: 0 }} />
                                </tr>
                            </tbody>
                        )}
                    </Fragment>
                )}
            </Table.Root>
        </div>
    )
}
