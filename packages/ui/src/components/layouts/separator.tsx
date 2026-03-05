import type { ComponentProps } from "react"
import { css, cx } from "../../utilities/cn.js"

export function Separator(props: {
    orientation?: "horizontal" | "vertical"
    className?: ComponentProps<"div">["className"]
}) {
    const orientation = props.orientation ?? "horizontal"

    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cx(
                css({
                    backgroundColor: "neutral/10",
                    flexShrink: 0,
                }),
                orientation === "horizontal"
                    ? css({
                          width: "100%",
                          height: "1px",
                      })
                    : css({
                          width: "1px",
                          height: "100%",
                      }),
                props.className,
            )}
        />
    )
}
