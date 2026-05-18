import type { HTMLAttributes } from "react"
import { css, cx } from "../../../utilities/cn.js"

export function DialogContent(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cx(
                css({
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
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
