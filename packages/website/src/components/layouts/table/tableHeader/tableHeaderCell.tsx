import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableHeaderCell(props: {
    children?: ReactElement | ReactElement[]
    className?: ComponentProps<"th">["className"]
    align?: ComponentProps<"th">["align"]
    colSpan?: ComponentProps<"td">["colSpan"]
}) {
    return (
        <th
            className={cx(
                css({
                    width: "fit",
                    padding: "1rem",
                    verticalAlign: "middle",
                }),
                props.className,
            )}
            colSpan={props.colSpan}
            align={props.align ?? "left"}
            children={props.children}
        />
    )
}
