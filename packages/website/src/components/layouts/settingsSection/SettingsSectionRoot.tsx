import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function SettingsSectionRoot(props: { variant?: "default" | "danger"; children: ReactNode }) {
    const isDanger = props.variant === "danger"

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "2rem",
                border: "1px solid",
                borderColor: isDanger ? "error/10" : "neutral/10",
                borderRadius: "lg",
                backgroundColor: isDanger ? undefined : "white",
            })}
        >
            {props.children}
        </div>
    )
}
