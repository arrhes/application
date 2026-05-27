import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function Box(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    minWidth: "0",
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit",
                    flexShrink: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflowX: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
