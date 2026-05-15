import { css, cx } from "../../../utilities/cn.js"
import type { HTMLAttributes } from "react"

export function DialogTitle(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            {...props}
            className={cx(
                css({
                    fontSize: "lg",
                    fontWeight: "semibold",
                }),
                props.className,
            )}
        />
    )
}
