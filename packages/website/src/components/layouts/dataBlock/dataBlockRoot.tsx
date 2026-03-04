import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function DataBlockRoot(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    flexShrink: "0",
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "0rem",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
