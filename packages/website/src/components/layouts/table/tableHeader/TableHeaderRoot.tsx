import { cn, css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableHeaderRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"thead">["className"]
}) {
    return (
        <thead
            className={cn(
                css({
                    width: "100%",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                }),
                props.className,
            )}
        >
            {props.children}
        </thead>
    )
}
