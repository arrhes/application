import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"

export function DialogTitle({
    className,
    ...props
}: Omit<HTMLAttributes<HTMLHeadingElement>, "className"> & {
    className?: Styles
}) {
    return (
        <h2
            {...props}
            className={css(
                {
                    fontSize: "lg",
                    fontWeight: "semibold",
                },
                className,
            )}
        >
            {props.children}
        </h2>
    )
}
