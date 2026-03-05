import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

export function PageDescription(props: { children: string; className?: ComponentProps<"div">["className"] }) {
    return (
        <span
            className={css({
                color: "neutral/50",
                fontSize: "md",
            })}
        >
            {props.children}
        </span>
    )
}
