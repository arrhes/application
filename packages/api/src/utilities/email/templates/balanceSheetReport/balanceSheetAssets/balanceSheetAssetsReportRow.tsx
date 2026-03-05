import { css, cx, Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import { PriceFormat } from "../../components/price/priceFormat.js"
import { Table } from "../../components/table/table.js"

export function BalanceSheetAssetsReportRow(props: {
    level: number
    number: string | null
    label: string
    grossAmount: number
    amortizationAmount: number
    isAmountDisplayed: boolean
}) {
    return (
        <Fragment>
            <Style />
            <Table.Body.Row>
                <Table.Body.Cell style={{ paddingLeft: `${props.level * 16 + 8}px` }}>
                    <span class={cx(css`white-space: normal;`, props.number ? css`font-weight: bold;` : undefined)}>
                        {props.number} {props.label}
                    </span>
                </Table.Body.Cell>
                <Table.Body.Cell align="right">
                    {props.isAmountDisplayed === true ? <PriceFormat price={props.grossAmount} /> : null}
                </Table.Body.Cell>
                <Table.Body.Cell align="right">
                    {props.isAmountDisplayed === true ? <PriceFormat price={props.amortizationAmount} /> : null}
                </Table.Body.Cell>
                <Table.Body.Cell align="right">
                    {props.isAmountDisplayed === true ? (
                        <PriceFormat price={props.grossAmount - props.amortizationAmount} />
                    ) : null}
                </Table.Body.Cell>
            </Table.Body.Row>
        </Fragment>
    )
}
