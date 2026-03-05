import { css, cx, Style } from "hono/css"
import { Fragment } from "hono/jsx/jsx-runtime"
import { PriceFormat } from "../../components/price/priceFormat.js"
import { Table } from "../../components/table/table.js"

export function BalanceSheetLiabilitiesReportRow(props: {
    level: number
    number: string | null
    label: string
    netAmount: number
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
                <Table.Body.Cell align="right"></Table.Body.Cell>
                <Table.Body.Cell align="right"></Table.Body.Cell>
                <Table.Body.Cell align="right">
                    {props.isAmountDisplayed === true ? <PriceFormat price={props.netAmount} /> : null}
                </Table.Body.Cell>
            </Table.Body.Row>
        </Fragment>
    )
}
