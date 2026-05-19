import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableBodyCell(props: {
    children?: ReactElement | null | ReactElement[]
    className?: ComponentProps<"td">["className"]
    style?: ComponentProps<"td">["style"]
    align?: ComponentProps<"td">["align"]
    colSpan?: ComponentProps<"td">["colSpan"]
}) {
    return (
        <td
            className={cx(
                css({
                    width: "fit",
                    padding: "1rem",
                    verticalAlign: "top",
                }),
                props.className,
            )}
            colSpan={props.colSpan}
            style={props.style}
            align={props.align ?? "left"}
        >
            {props.children}
        </td>
    )
}
