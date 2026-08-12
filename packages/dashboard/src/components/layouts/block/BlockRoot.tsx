import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function BlockRoot(props: { variant?: "default" | "danger"; children: ReactNode }) {
    const isDanger = props.variant === "danger"

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: isDanger ? "error/10" : "neutral/10",
                borderRadius: "lg",
                backgroundColor: "white",
                overflow: "hidden",
            })}
        >
            {props.children}
        </div>
    )
}
