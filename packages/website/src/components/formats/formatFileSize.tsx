import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import { FormatBase } from "./formatBase.js"
import { FormatNull } from "./formatNull.js"

const sizes = ["o", "ko", "Mo", "Go", "To"]

export function formatFileSize(size?: number | null) {
    if (size === undefined || size === null) return "/"

    if (size === 0) return `0 ${sizes.at(0)}`
    const i = Math.floor(Math.log(size) / Math.log(1000))
    return `${parseFloat((size / 1000 ** i).toFixed(2))} ${sizes.at(i)}`
}

type FormatFileSize = {
    size?: number | null
    className?: ComponentProps<"div">["className"]
}

export function FormatFileSize(props: FormatFileSize) {
    if (props.size === undefined || props.size === null) return <FormatNull />
    return (
        <FormatBase className={props.className}>
            <span
                className={css({
                    width: "fit",
                    maxWidth: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: "sm",
                    fontFamily: "mono",
                    wordBreak: "break-word",
                })}
            >
                {formatFileSize(props.size)}
            </span>
        </FormatBase>
    )
}
