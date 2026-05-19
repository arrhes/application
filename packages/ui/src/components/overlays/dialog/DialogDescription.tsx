import type { HTMLAttributes } from "react"
import { css, cx } from "../../../utilities/cn.js"

export function DialogDescription(props: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            {...props}
            className={cx(
                css({
                    fontSize: "sm",
                    color: "neutral/50",
                }),
                props.className,
            )}
        />
    )
}
