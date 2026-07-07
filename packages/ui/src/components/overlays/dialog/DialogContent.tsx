import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"

export function DialogContent({
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
                    minWidth: "100%",
                    width: "100%",
                    maxWidth: "md",
                    height: "fit",
                    maxH: "100%",
                    backgroundColor: "white",
                    borderRadius: "lg",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    md: {
                        minWidth: "md",
                    },
                },
                className,
            )}
        >
            {props.children}
        </div>
    )
}
