import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { HTMLAttributes } from "react"

export function DialogFooter(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cx(
                css({
                    padding: "1rem",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/5",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                }),
                props.className,
            )}
        />
    )
}
