import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function BlockRow(props: {
    title?: string
    description?: string
    variant?: "default" | "danger"
    children?: ReactNode
}) {
    const isDanger = props.variant === "danger"

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid",
                borderBottomColor: isDanger ? "error/10" : "neutral/10",
                _last: {
                    borderBottom: "none",
                },
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "sm",
                        fontWeight: "semibold",
                    })}
                >
                    {props.title}
                </span>
                <span
                    className={css({
                        fontSize: "xs",
                        color: "neutral/50",
                    })}
                >
                    {props.description}
                </span>
            </div>
            {props.children}
        </div>
    )
}
