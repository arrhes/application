import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function CardRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    overflowY: "auto",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
