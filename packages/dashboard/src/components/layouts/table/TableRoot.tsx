import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"table">["className"]
}) {
    return (
        <table
            className={cn(
                css({
                    width: "100%",
                    height: "fit",
                    borderCollapse: "collapse",
                }),
                props.className,
            )}
        >
            {props.children}
        </table>
    )
}
