import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

export function TitleComponent(props: { children: string; className?: ComponentProps<"div">["className"] }) {
    return (
        <span
            className={cx(
                css({
                    textTransform: "uppercase",
                    color: "neutral/25",
                    fontSize: "base",
                }),
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
