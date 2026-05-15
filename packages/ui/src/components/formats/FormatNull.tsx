import type { ComponentProps } from "react"
import { css, cx } from "../../utilities/cn.js"

export function FormatNull(props: { text?: string; className?: ComponentProps<"span">["className"] }) {
    return (
        <span
            className={cx(
                css({
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "sm",
                    fontStyle: "italic",
                    color: "neutral/50",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                }),
                props.className,
            )}
        >
            {props.text ?? "/"}
        </span>
    )
}
