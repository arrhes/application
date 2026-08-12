import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentPropsWithRef } from "react"

export function ContextMenuSeparator({ className, ...props }: ComponentPropsWithRef<"div">) {
    return (
        <div
            {...props}
            className={cn(
                css({
                    width: "100%",
                    height: "1px",
                    backgroundColor: "neutral/10",
                }),
                className,
            )}
        />
    )
}
