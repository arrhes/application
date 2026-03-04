import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { FormatPrice } from "../../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { Table } from "../../../../../../components/layouts/table/table.tsx"

export function BalanceSheetAssetsReportRow(props: {
    level: number
    number: string | null
    label: string
    grossAmount: number
    amortizationAmount: number
    isAmountDisplayed: boolean
}) {
    return (
        <Table.Body.Row className={cx("", props.number ? css({ backgroundColor: "neutral/5" }) : "")}>
            <Table.Body.Cell style={{ paddingLeft: `${props.level * 16 + 8}px` }}>
                <FormatText
                    className={cx(css({ whiteSpace: "normal" }), props.number ? css({ fontWeight: "bold" }) : "")}
                >
                    {props.number} {props.label}
                </FormatText>
            </Table.Body.Cell>
            <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                {props.isAmountDisplayed === true ? <FormatPrice price={props.grossAmount} /> : null}
            </Table.Body.Cell>
            <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                {props.isAmountDisplayed === true ? <FormatPrice price={props.amortizationAmount} /> : null}
            </Table.Body.Cell>
            <Table.Body.Cell className={css({ width: "[1%]" })} align="right">
                {props.isAmountDisplayed === true ? (
                    <FormatPrice price={props.grossAmount + props.amortizationAmount} />
                ) : null}
            </Table.Body.Cell>
        </Table.Body.Row>
    )
}
