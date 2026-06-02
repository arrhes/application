import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"

export function DialogDescription({
    className,
    ...props
}: Omit<HTMLAttributes<HTMLParagraphElement>, "className"> & {
    className?: Styles
}) {
    return (
        <p
            {...props}
            className={css(
                {
                    fontSize: "sm",
                    color: "neutral/50",
                },
                className,
            )}
        />
    )
}
