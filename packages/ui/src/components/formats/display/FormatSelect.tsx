import type { Styles } from "../../../../styled-system/css/css"
import { Chip, type ChipColors } from "../../layouts/Chip.js"
import { FormatBase } from "../FormatBase.js"
import { FormatNull } from "../FormatNull.js"
import { formatSelect } from "../formatSelect.js"

export function FormatSelect(props: {
    option?: string | null
    options: Array<{
        key: string
        label: string
    }>
    color?: ChipColors
    className?: Styles
}) {
    const option = formatSelect(props.option, props.options)
    if (!option) return <FormatNull />
    return (
        <FormatBase className={props.className}>
            <Chip
                text={option}
                color={props.color}
            />
        </FormatBase>
    )
}
