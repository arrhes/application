import { cn, css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentPropsWithRef, ReactElement } from "react"

export function TableBodyRoot(props: {
    children?: ReactElement | null | (ReactElement | null)[]
    className?: ComponentPropsWithRef<"tbody">["className"]
    ref?: ComponentPropsWithRef<"tbody">["ref"]
    "data-index"?: number
}) {
    return (
        <tbody
            ref={props.ref}
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
}
