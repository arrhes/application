import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"

export function DialogFooter({
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
                    padding: "1rem",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/5",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                },
                className,
            )}
        />
    )
}
