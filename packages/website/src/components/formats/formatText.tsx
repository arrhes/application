import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"
import { FormatNull } from "./formatNull.js"

export function FormatText(props: {
    wrap?: boolean
    className?: ComponentProps<"span">["className"]
    children?: ReactNode
}) {
    if (!props.children) return <FormatNull />
    return (
        <span
            className={cx(
                css({
                    fontSize: "sm",
                    wordBreak: "break-word",
                    overflowX: "hidden",
                    textOverflow: "ellipsis",
                }),
                !props.wrap ? css({ whiteSpace: "nowrap" }) : undefined,
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
