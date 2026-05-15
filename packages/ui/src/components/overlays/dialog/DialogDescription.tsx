import { css, cx } from "../../../utilities/cn.js"
import type { HTMLAttributes } from "react"

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
