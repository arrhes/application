import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function DocCode(props: { children: ReactNode }) {
    return (
        <code
            className={css({
                backgroundColor: "neutral/5",
                padding: "0.125rem 0.375rem",
                borderRadius: "sm",
                fontFamily: "mono",
                fontSize: "xs",
                color: "neutral",
            })}
        >
            {props.children}
        </code>
    )
}
