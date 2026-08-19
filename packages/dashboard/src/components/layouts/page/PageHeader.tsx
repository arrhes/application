import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"

export function PageHeader(props: { children?: ReactNode; className?: ComponentProps<"div">["className"] }) {
    return (
        <div
            className={cn(
                css({
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
