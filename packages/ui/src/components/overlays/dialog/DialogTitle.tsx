import type { HTMLAttributes } from "react"
import { css, cx } from "../../../utilities/cn.js"

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
