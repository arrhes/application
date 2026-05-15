import type { ComponentProps } from "react"
import { css, cx } from "../../../utilities/cn.js"
import { FormatNull } from "../FormatNull.js"
import { FormatText } from "../FormatText.js"
import { formatDate } from "../formatDate.js"

export function FormatDate(props: {
    date?: string | Date | undefined | null
    className?: ComponentProps<"div">["className"]
}) {
    if (!props.date) return <FormatNull />
    if (String(new Date(props.date)) === "Invalid Date") return <FormatNull />
    return (
        <FormatText
            className={cx(
                css({
                    fontFamily: "mono",
                }),
                props.className,
            )}
        >
            {formatDate(props.date)}
        </FormatText>
    )
}
