import { FormatPrice, FormatText } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { Table } from "../../../../../components/layouts/table/table.tsx"

export function IncomeStatementReportRow(props: {
    level: number
    number: string | null
    label: string
    amount: number
    isAmountDisplayed: boolean
}) {
    return (
        <Table.Body.Row
            className={cx(
                css({}),
                props.number
                    ? css({
                          backgroundColor: "neutral/5",
                      })
                    : "",
            )}
        >
            <Table.Body.Cell
                style={{
                    paddingLeft: `${props.level * 16 + 8}px`,
                }}
            >
                <FormatText
                    className={cx(
                        css({
                            whiteSpace: "normal",
                        }),
                        props.number
                            ? css({
                                  fontWeight: "bold",
                              })
                            : "",
                    )}
                >
                    {props.number} {props.label}
                </FormatText>
            </Table.Body.Cell>
            <Table.Body.Cell
                className={css({
                    width: "[1%]",
                })}
                align="right"
            >
                {props.isAmountDisplayed === true ? <FormatPrice price={props.amount} /> : null}
            </Table.Body.Cell>
        </Table.Body.Row>
    )
}
