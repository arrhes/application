import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function DocRoot(props: { children: ReactNode }) {
    return (
        <div
            className={css({
                width: "100%",
                maxWidth: "lg",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            })}
        >
            {props.children}
        </div>
    )
}
