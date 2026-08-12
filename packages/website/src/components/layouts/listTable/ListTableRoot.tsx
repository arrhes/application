import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, JSX } from "react"

export function ListTableRoot(props: {
    children: JSX.Element | JSX.Element[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cn(
                css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
