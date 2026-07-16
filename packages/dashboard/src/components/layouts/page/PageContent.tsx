import { cn, css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"

export function PageContent(props: { className?: ComponentProps<"div">["className"]; children: ReactNode }) {
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
                    gap: "2rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
