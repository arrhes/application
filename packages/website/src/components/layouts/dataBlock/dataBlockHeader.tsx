import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

export function DataBlockHeader(props: { title: string; className?: ComponentProps<"div">["className"] }) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    padding: "0.5rem",
                }),
                props.className,
            )}
        >
            <span
                className={css({
                    textTransform: "uppercase",
                    color: "neutral/50",
                    fontSize: "xs",
                    fontWeight: "medium",
                    letterSpacing: "wide",
                })}
            >
                {props.title}
            </span>
        </div>
    )
}
