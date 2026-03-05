import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import { FormatNull } from "./formatNull.js"
import { FormatText } from "./formatText.js"

export function formatDate(rawDate?: string | Date | undefined | null) {
    if (!rawDate || String(new Date(rawDate)) === "Invalid Date") return undefined

    const date = new Date(rawDate)
    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    const year = String(date.getFullYear())

    if (date.getDate() < 10) day = `0${day}`
    if (date.getMonth() + 1 < 10) month = `0${month}`

    return `${[day, month, year].join("/")}`
}

export function FormatDate(props: {
    date?: string | Date | undefined | null
    className?: ComponentProps<"div">["className"]
}) {
    if (!props.date) return <FormatNull />
    if (String(new Date(props.date)) === "Invalid Date") return <FormatNull />
    return (
        <FormatText className={cx(css({ fontFamily: "mono" }), props.className)}>{formatDate(props.date)}</FormatText>
    )
}
