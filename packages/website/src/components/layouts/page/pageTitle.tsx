import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

export function PageTitle(props: { children?: string; className?: ComponentProps<"div">["className"] }) {
    return (
        <span
            className={css({
                fontSize: "lg",
                fontWeight: "semibold",
                whiteSpace: "nowrap",
            })}
        >
            {props.children}
        </span>
    )
}
