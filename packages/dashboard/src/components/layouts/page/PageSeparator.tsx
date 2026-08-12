import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps } from "react"

type PageSeparator = ComponentProps<"div">

export function PageSeparator(props: PageSeparator) {
    return (
        <div
            className={cn(
                css({
                    width: "100%",
                    height: "1px",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                }),
                props.className,
            )}
        />
    )
}
