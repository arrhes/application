import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, JSX } from "react"

export function ListTableRow(props: {
    children: JSX.Element | JSX.Element[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    _last: { borderBottom: "none" },
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
