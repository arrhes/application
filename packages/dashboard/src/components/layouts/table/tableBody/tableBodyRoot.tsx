import { cn, css } from "@comptasse/ui/utilities/cn.js"
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
            className={cn(
                css({
                    width: "100%",
                }),
                props.className,
            )}
        >
            {props.children}
        </tbody>
    )
})
