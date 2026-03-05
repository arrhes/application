import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableHeaderRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"tr">["className"]
}) {
    return <tr className={cx(css({ width: "100%" }), props.className)} children={props.children} />
}
