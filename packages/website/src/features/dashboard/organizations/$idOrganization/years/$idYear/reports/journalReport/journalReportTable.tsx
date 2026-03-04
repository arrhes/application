import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Fragment, useRef } from "react"
import type * as v from "valibot"
import { FormatDate } from "../../../../../../../../components/formats/formatDate.tsx"
import { FormatNull } from "../../../../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../../../../components/layouts/table/table.tsx"
import { compareAmounts } from "../../../../../../../../utilities/compareAmounts.ts"

export function JournalReportTable(props: {
    records: Array<v.InferOutput<typeof returnedSchemas.record>>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Map<string, v.InferOutput<typeof returnedSchemas.account>>
}) {
    const recordRows = props.recordRows
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const totalDebit = recordRows.reduce((acc, recordRow) => acc + Number(recordRow.debit), 0)
    const totalCredit = recordRows.reduce((acc, recordRow) => acc + Number(recordRow.credit), 0)

    const virtualizer = useVirtualizer({
        count: props.records.length,
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
                            <span className={css({ color: "neutral/75", fontSize: "sm" })}>Date</span>
                        </Table.Header.Cell>
                        <Table.Header.Cell>
                            <span className={css({ color: "neutral/75", fontSize: "sm" })}>Libellé</span>
                        </Table.Header.Cell>
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
                    </Table.Header.Row>
                </Table.Header.Root>
                <Table.Body.Root
                    className={css({ borderY: "1px solid token(colors.neutral/10)", _last: { borderBottom: "0" } })}
                >
                    <Table.Body.Row>
                        <Table.Body.Cell colSpan={2} />
                        <Table.Body.Cell align="right">
                            <span className={css({ color: "neutral/50" })}>Total</span>
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={totalDebit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                            <FormatPrice price={totalCredit} className={css({ fontWeight: "bold" })} />
                        </Table.Body.Cell>
                    </Table.Body.Row>
                </Table.Body.Root>
                {props.records.length === 0 ? (
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
                                    <td colSpan={5} style={{ height: `${paddingTop}px`, padding: 0, border: 0 }} />
                                </tr>
                            </tbody>
                        )}
                        {virtualItems.map((virtualItem) => {
                            const record = props.records[virtualItem.index]
                            const sortedRecordRows = recordRows
                                .filter((recordRow) => recordRow.idRecord === record.id)
                                .sort((a, b) => (a.lastUpdatedAt ?? "").localeCompare(b.lastUpdatedAt ?? ""))

                            const recordTotalDebit = sortedRecordRows.reduce(
                                (acc, recordRow) => acc + Number(recordRow.debit),
                                0,
                            )
                            const recordTotalCredit = sortedRecordRows.reduce(
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
                                        className={cx(
                                            css({ borderColor: "neutral/10", backgroundColor: "background" }),
                                        )}
                                    >
                                        <Table.Body.Cell>
                                            <FormatDate className={css({ fontStyle: "italic" })} date={record.date} />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell colSpan={2}>
                                            <FormatText wrap={true}>{record.label}</FormatText>
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={recordTotalDebit}
                                                className={cx(
                                                    css({ fontWeight: "bold" }),
                                                    compareAmounts({
                                                        a: recordTotalDebit,
                                                        b: recordTotalCredit,
                                                    })
                                                        ? ""
                                                        : css({ color: "error" }),
                                                )}
                                            />
                                        </Table.Body.Cell>
                                        <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                                            <FormatPrice
                                                price={recordTotalCredit}
                                                className={cx(
                                                    css({ fontWeight: "bold" }),
                                                    compareAmounts({
                                                        a: recordTotalDebit,
                                                        b: recordTotalCredit,
                                                    })
                                                        ? css({ color: "neutral" })
                                                        : css({ color: "error" }),
                                                )}
                                            />
                                        </Table.Body.Cell>
                                    </Table.Body.Row>
                                    {/* biome-ignore lint/complexity/noUselessFragments: Fragment needed for TypeScript type compatibility with Table.Body.Root children */}
                                    <Fragment>
                                        {sortedRecordRows.map((recordRow) => {
                                            const account = props.accounts.get(recordRow.idAccount)

                                            return (
                                                <Table.Body.Row key={recordRow.id}>
                                                    <Table.Body.Cell />
                                                    <Table.Body.Cell>
                                                        <FormatText wrap={true}>{recordRow.label}</FormatText>
                                                    </Table.Body.Cell>
                                                    <Table.Body.Cell>
                                                        <div
                                                            className={css({
                                                                display: "flex",
                                                                justifyContent: "start",
                                                                alignItems: "start",
                                                                gap: "0.5rem",
                                                            })}
                                                        >
                                                            {account && (
                                                                <Fragment>
                                                                    <FormatText
                                                                        className={css({
                                                                            overflow: "visible",
                                                                        })}
                                                                    >
                                                                        {account.number}
                                                                    </FormatText>
                                                                    <FormatText
                                                                        wrap={true}
                                                                        className={css({
                                                                            color: "neutral/50",
                                                                        })}
                                                                    >
                                                                        {account.label}
                                                                    </FormatText>
                                                                </Fragment>
                                                            )}
                                                        </div>
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
