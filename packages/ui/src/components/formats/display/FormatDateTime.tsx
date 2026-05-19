import type { ComponentProps } from "react"
import { css } from "../../../utilities/cn.js"
import { FormatNull } from "../FormatNull.js"
import { formatDateTime } from "../formatDateTime.js"

export function FormatDateTime(props: {
    date?: string | Date | undefined | null
    className?: ComponentProps<"div">["className"]
}) {
    const formatted = formatDateTime(props.date)
    if (!formatted) return <FormatNull />

    const [datePart, timePart] = formatted.split(" ")

    return (
        <div
            className={css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.25rem",
            })}
        >
            <span
                className={css({
                    fontSize: "sm",
                    fontFamily: "mono",
                })}
            >
                {datePart}
            </span>
            <span
                className={css({
                    fontSize: "xs",
                    lineHeight: "none",
                    fontFamily: "mono",
                    color: "neutral/75",
                })}
            >
                {timePart}
            </span>
        </div>
    )
}
