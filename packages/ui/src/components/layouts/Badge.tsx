import type { ComponentProps } from "react"
import { css } from "../../utilities/cn.ts"

export function Badge(props: { className?: ComponentProps<"div">["className"]; children: string }) {
    return (
        <div
            className={css({
                display: "inline-flex",
                alignItems: "center",
                padding: "0.5rem",
                backgroundColor: "primary/10",
            })}
        >
            <span
                className={css({
                    color: "primary",
                    fontWeight: "medium",
                    fontSize: "xs",
                    lineHeight: "normal",
                })}
            >
                {props.children}
            </span>
        </div>
    )
}
