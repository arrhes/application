import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"

export function DialogBody({
    className,
    ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "className"> & {
    className?: Styles
}) {
    return (
        <div
            {...props}
            className={css(
                {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                },
                className,
            )}
        >
            {props.children}
        </div>
    )
}
