import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type ComponentProps, forwardRef, type ReactElement } from "react"

export const TableBodyRoot = forwardRef<
    HTMLTableSectionElement,
    {
        children?: ReactElement | null | (ReactElement | null)[]
        className?: ComponentProps<"tbody">["className"]
        "data-index"?: number
    }
>(function TableBodyRoot(props, ref) {
    return (
        <tbody
            ref={ref}
            data-index={props["data-index"]}
            className={cx(css({ width: "100%" }), props.className)}
            children={props.children}
        />
    )
})
