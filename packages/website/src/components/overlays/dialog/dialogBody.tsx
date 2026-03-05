import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { HTMLAttributes } from "react"

export function DialogBody(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
