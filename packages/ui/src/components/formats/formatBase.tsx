import type { ComponentProps, ReactNode } from "react"
import { css, cx } from "../../utilities/cn.js"

type FormatBase = {
    children: ReactNode
    className?: ComponentProps<"div">["className"]
}

export function FormatBase(props: FormatBase) {
    return (
        <div
            className={cx(
                css({
                    width: "fit",
                    maxWidth: "100%",
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
