import type { ComponentProps } from "react"
import { Chip, type ChipColors } from "../layouts/chip.js"
import { FormatBase } from "./formatBase.js"
import { FormatNull } from "./formatNull.js"

export function formatSelect(key: string | null | undefined, options: { key: string; label: string }[]) {
    return options.find((x) => x.key === key)?.label ?? ""
}

type FormatSelect = {
    option?: string | null
    options: Array<{
        key: string
        label: string
    }>
    color?: ChipColors
    className?: ComponentProps<"div">["className"]
}

export function FormatSelect(props: FormatSelect) {
    const option = formatSelect(props.option, props.options)
    if (!option) return <FormatNull />
    return (
        <FormatBase className={props.className}>
            <Chip text={option} color={props.color} />
        </FormatBase>
    )
}
